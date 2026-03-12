#!/bin/bash
# Deploy Elementor JSON usando base64 encoding per evitare problemi di escaping
# Il JSON viene codificato in base64, passato come stringa, e decodificato sul server

SSH_CMD="/Users/mac/.config/lucasammarco/ssh-wp.sh"
JSON_DIR="/Users/mac/lucasammarco-react/elementor-migration/json"

deploy_post() {
    local ID=$1
    local TYPE=$2
    local JSON_FILE=$3

    echo ""
    echo "--- Deploying ID $ID (${TYPE}) ---"

    # Codifica il JSON in base64 per trasferimento sicuro
    local B64=$(base64 -i "$JSON_FILE" | tr -d '\n')

    # Imposta meta base
    $SSH_CMD "wp post meta update ${ID} _elementor_edit_mode 'builder'"
    sleep 0.5
    $SSH_CMD "wp post meta update ${ID} _elementor_template_type '${TYPE}'"
    sleep 0.5
    $SSH_CMD "wp post meta update ${ID} _elementor_version '3.21.0'"
    sleep 0.5

    # Usa wp eval per decodificare base64 e salvare il meta
    # Split in chunks se necessario, qui passiamo tutto in un wp eval inline
    $SSH_CMD "wp eval 'update_post_meta(${ID}, \"_elementor_data\", base64_decode(\"${B64}\")); echo \"OK: _elementor_data updated for ${ID}\";'"
    sleep 0.5

    # Cancella il CSS per forzare rigenerazione
    $SSH_CMD "wp post meta delete ${ID} _elementor_css 2>/dev/null; echo 'CSS cleared for ${ID}'"
    sleep 0.3

    echo "Done ID $ID"
}

echo "=== ELEMENTOR MIGRATION - BASE64 DEPLOY ==="
echo "Started at: $(date)"

# ARTICOLI
echo ""
echo "== POSTS =="
deploy_post 7221 "wp-post" "$JSON_DIR/post_7221.json"
deploy_post 7222 "wp-post" "$JSON_DIR/post_7222.json"
deploy_post 7223 "wp-post" "$JSON_DIR/post_7223.json"

# GEO-PAGES
echo ""
echo "== GEO-PAGES =="
deploy_post 7224 "wp-page" "$JSON_DIR/page_7224.json"
deploy_post 7225 "wp-page" "$JSON_DIR/page_7225.json"
deploy_post 7226 "wp-page" "$JSON_DIR/page_7226.json"
deploy_post 7227 "wp-page" "$JSON_DIR/page_7227.json"
deploy_post 7228 "wp-page" "$JSON_DIR/page_7228.json"
deploy_post 7229 "wp-page" "$JSON_DIR/page_7229.json"
deploy_post 7230 "wp-page" "$JSON_DIR/page_7230.json"
deploy_post 7231 "wp-page" "$JSON_DIR/page_7231.json"

# FLUSH
echo ""
echo "== FLUSH CSS =="
$SSH_CMD "wp elementor flush-css && echo 'Elementor CSS flushed'"
sleep 1
$SSH_CMD "wp cache flush && echo 'Cache flushed'"

echo ""
echo "=== DEPLOYMENT COMPLETE at $(date) ==="
echo "Test:"
echo "  https://lucasammarco.com/?p=7221"
echo "  https://lucasammarco.com/?p=7222"
echo "  https://lucasammarco.com/?p=7223"
echo "  https://lucasammarco.com/?page_id=7224"
