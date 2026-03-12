#!/bin/bash
# Carica i file JSON e lo script PHP sul server via wp eval chunk-based

SSH_CMD="/Users/mac/.config/lucasammarco/ssh-wp.sh"
JSON_DIR="/Users/mac/lucasammarco-react/elementor-migration/json"
PHP_SCRIPT="/Users/mac/lucasammarco-react/elementor-migration/update_elementor.php"

# Crea directory sul server
$SSH_CMD "mkdir -p wp-content/elementor_json && echo 'Dir created'"

# Funzione per uploadare un file in chunk da 20KB (base64)
upload_file() {
    local LOCAL_FILE=$1
    local REMOTE_NAME=$2
    local CHUNK_SIZE=15000  # 15K chars per chunk (base64)

    echo "Uploading $REMOTE_NAME..."

    # Codifica in base64
    local B64=$(base64 -i "$LOCAL_FILE" | tr -d '\n')
    local TOTAL_LEN=${#B64}
    local NUM_CHUNKS=$(( (TOTAL_LEN + CHUNK_SIZE - 1) / CHUNK_SIZE ))

    echo "  Total base64 length: $TOTAL_LEN, chunks: $NUM_CHUNKS"

    # Prima chunk: crea il file
    local FIRST_CHUNK="${B64:0:$CHUNK_SIZE}"
    $SSH_CMD "wp eval 'file_put_contents(ABSPATH . \"wp-content/elementor_json/${REMOTE_NAME}\", base64_decode(\"${FIRST_CHUNK}\")); echo \"chunk 1/${NUM_CHUNKS} written\";'" 2>&1 | tail -2

    # Chunk successivi: append
    local POS=$CHUNK_SIZE
    local CHUNK_NUM=2
    while [ $POS -lt $TOTAL_LEN ]; do
        local CHUNK="${B64:$POS:$CHUNK_SIZE}"
        $SSH_CMD "wp eval 'file_put_contents(ABSPATH . \"wp-content/elementor_json/${REMOTE_NAME}\", base64_decode(\"${CHUNK}\"), FILE_APPEND); echo \"chunk ${CHUNK_NUM}/${NUM_CHUNKS} appended\";'" 2>&1 | tail -2
        POS=$((POS + CHUNK_SIZE))
        CHUNK_NUM=$((CHUNK_NUM + 1))
    done

    # Verifica
    $SSH_CMD "wp eval 'echo \"File size: \" . filesize(ABSPATH . \"wp-content/elementor_json/${REMOTE_NAME}\");'" 2>&1 | tail -2

    echo "  Upload complete: $REMOTE_NAME"
}

echo "=== UPLOADING PHP SCRIPT ==="
upload_file "$PHP_SCRIPT" "update_elementor.php"

echo ""
echo "=== UPLOADING JSON FILES ==="

# Posts
upload_file "$JSON_DIR/post_7221.json" "post_7221.json"
upload_file "$JSON_DIR/post_7222.json" "post_7222.json"
upload_file "$JSON_DIR/post_7223.json" "post_7223.json"

# Geo-pages
upload_file "$JSON_DIR/page_7224.json" "page_7224.json"
upload_file "$JSON_DIR/page_7225.json" "page_7225.json"
upload_file "$JSON_DIR/page_7226.json" "page_7226.json"
upload_file "$JSON_DIR/page_7227.json" "page_7227.json"
upload_file "$JSON_DIR/page_7228.json" "page_7228.json"
upload_file "$JSON_DIR/page_7229.json" "page_7229.json"
upload_file "$JSON_DIR/page_7230.json" "page_7230.json"
upload_file "$JSON_DIR/page_7231.json" "page_7231.json"

echo ""
echo "=== RUNNING PHP SCRIPT ==="
$SSH_CMD "wp eval-file wp-content/elementor_json/update_elementor.php"

echo ""
echo "=== CLEANUP ==="
$SSH_CMD "rm -rf wp-content/elementor_json/ && echo 'Cleanup done'"

echo ""
echo "=== DONE ==="
