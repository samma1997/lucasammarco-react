#!/bin/bash
# Carica file JSON sul server WordPress via wp eval chunk-based
# Ogni chunk è 1000 chars di base64 (~750 bytes di dati)

SSH_CMD="/Users/mac/.config/lucasammarco/ssh-wp.sh"
JSON_DIR="/Users/mac/lucasammarco-react/elementor-migration/json"
REMOTE_DIR="/home/customer/www/lucasammarco.com/public_html/wp-content/elementor_json"
CHUNK_SIZE=1000

upload_file() {
    local LOCAL_FILE=$1
    local REMOTE_NAME=$2

    echo "Uploading $REMOTE_NAME..."

    local B64=$(base64 -i "$LOCAL_FILE" | tr -d '\n')
    local TOTAL_LEN=${#B64}
    local NUM_CHUNKS=$(( (TOTAL_LEN + CHUNK_SIZE - 1) / CHUNK_SIZE ))

    echo "  Size: $TOTAL_LEN b64 chars, $NUM_CHUNKS chunks"

    # Prima chunk (crea/sovrascrive file)
    local CHUNK="${B64:0:$CHUNK_SIZE}"
    $SSH_CMD "wp eval 'file_put_contents(\"${REMOTE_DIR}/${REMOTE_NAME}\", base64_decode(\"${CHUNK}\"));'" 2>&1 | grep -v 'passphrase\|Warning\|Permanently\|Enter' | head -2

    # Chunk successivi (append)
    local POS=$CHUNK_SIZE
    while [ $POS -lt $TOTAL_LEN ]; do
        local CHUNK="${B64:$POS:$CHUNK_SIZE}"
        $SSH_CMD "wp eval 'file_put_contents(\"${REMOTE_DIR}/${REMOTE_NAME}\", base64_decode(\"${CHUNK}\"), FILE_APPEND);'" 2>&1 | grep -v 'passphrase\|Warning\|Permanently\|Enter' | head -1
        POS=$((POS + CHUNK_SIZE))
    done

    # Verifica dimensione finale
    local FINAL_SIZE=$($SSH_CMD "wp eval 'echo filesize(\"${REMOTE_DIR}/${REMOTE_NAME}\");'" 2>&1 | tail -1)
    echo "  Done: $FINAL_SIZE bytes on server"
}

# Assicurati che la dir esista
$SSH_CMD "mkdir -p ${REMOTE_DIR}" 2>&1 | tail -1

echo "=== UPLOADING PHP SCRIPT ==="
upload_file "/Users/mac/lucasammarco-react/elementor-migration/update_elementor.php" "update_elementor.php"

echo ""
echo "=== UPLOADING JSON FILES ==="

upload_file "$JSON_DIR/post_7221.json" "post_7221.json"
upload_file "$JSON_DIR/post_7222.json" "post_7222.json"
upload_file "$JSON_DIR/post_7223.json" "post_7223.json"
upload_file "$JSON_DIR/page_7224.json" "page_7224.json"
upload_file "$JSON_DIR/page_7225.json" "page_7225.json"
upload_file "$JSON_DIR/page_7226.json" "page_7226.json"
upload_file "$JSON_DIR/page_7227.json" "page_7227.json"
upload_file "$JSON_DIR/page_7228.json" "page_7228.json"
upload_file "$JSON_DIR/page_7229.json" "page_7229.json"
upload_file "$JSON_DIR/page_7230.json" "page_7230.json"
upload_file "$JSON_DIR/page_7231.json" "page_7231.json"

echo ""
echo "=== ALL FILES UPLOADED ==="
