#!/bin/bash
# Deploy Elementor JSON to lucasammarco.com via WP-CLI over SSH
# Usage: ./deploy_elementor.sh

SSH_CMD="/Users/mac/.config/lucasammarco/ssh-wp.sh"
JSON_DIR="/Users/mac/lucasammarco-react/elementor-migration/json"

echo "=== ELEMENTOR MIGRATION DEPLOY ==="
echo "Starting deployment of Elementor data..."

deploy_post() {
    local ID=$1
    local TYPE=$2  # wp-post or wp-page
    local JSON_FILE=$3

    echo ""
    echo "--- Deploying ID $ID (type: $TYPE) ---"

    # Leggi il JSON e scrivilo in un file temporaneo sul server via stdin
    local JSON_CONTENT=$(cat "$JSON_FILE")

    # Usa un file temporaneo sul server per evitare problemi di escaping
    # Prima trasferisci il JSON via heredoc su file temporaneo
    $SSH_CMD "cat > /tmp/elementor_${ID}.json << 'EOFMARKER'
$(cat "$JSON_FILE")
EOFMARKER
echo 'JSON written'"

    # Imposta i meta Elementor
    $SSH_CMD "wp post meta update ${ID} _elementor_edit_mode 'builder' && echo 'edit_mode OK'"
    $SSH_CMD "wp post meta update ${ID} _elementor_template_type '${TYPE}' && echo 'template_type OK'"
    $SSH_CMD "wp post meta update ${ID} _elementor_version '3.21.0' && echo 'version OK'"

    # Aggiorna _elementor_data dal file temporaneo
    $SSH_CMD "wp post meta update ${ID} _elementor_data \"\$(cat /tmp/elementor_${ID}.json)\" && echo '_elementor_data OK'"

    # Svuota il CSS per forzare la rigenerazione
    $SSH_CMD "wp post meta delete ${ID} _elementor_css && echo '_elementor_css cleared'"
    $SSH_CMD "wp post meta update ${ID} _elementor_page_settings '{}' && echo 'page_settings OK'"

    # Rimuovi il file temporaneo
    $SSH_CMD "rm -f /tmp/elementor_${ID}.json && echo 'Temp file removed'"

    echo "--- ID $ID deployed ---"
}

# ========== ARTICOLI (wp-post) ==========
echo ""
echo "=== DEPLOYING POSTS ==="

deploy_post 7221 "wp-post" "$JSON_DIR/post_7221.json"
deploy_post 7222 "wp-post" "$JSON_DIR/post_7222.json"
deploy_post 7223 "wp-post" "$JSON_DIR/post_7223.json"

# ========== GEO-PAGES (wp-page) ==========
echo ""
echo "=== DEPLOYING GEO-PAGES ==="

deploy_post 7224 "wp-page" "$JSON_DIR/page_7224.json"
deploy_post 7225 "wp-page" "$JSON_DIR/page_7225.json"
deploy_post 7226 "wp-page" "$JSON_DIR/page_7226.json"
deploy_post 7227 "wp-page" "$JSON_DIR/page_7227.json"
deploy_post 7228 "wp-page" "$JSON_DIR/page_7228.json"
deploy_post 7229 "wp-page" "$JSON_DIR/page_7229.json"
deploy_post 7230 "wp-page" "$JSON_DIR/page_7230.json"
deploy_post 7231 "wp-page" "$JSON_DIR/page_7231.json"

# ========== FLUSH ELEMENTOR CSS ==========
echo ""
echo "=== FLUSHING ELEMENTOR CSS ==="
$SSH_CMD "wp elementor flush-css && echo 'Elementor CSS flushed'"

# ========== FLUSH CACHE ==========
echo ""
echo "=== FLUSHING CACHES ==="
$SSH_CMD "wp cache flush && echo 'Object cache flushed'"
$SSH_CMD "wp elementor kit library sync && echo 'Kit synced' || echo 'Kit sync not available'"

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "All 11 posts/pages updated with Elementor structure."
echo "Test URLs:"
echo "  https://lucasammarco.com/?p=7221"
echo "  https://lucasammarco.com/?p=7222"
echo "  https://lucasammarco.com/?p=7223"
echo "  https://lucasammarco.com/?page_id=7224"
