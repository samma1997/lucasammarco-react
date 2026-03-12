#!/bin/bash
# Deploy Elementor JSON usando PHP eval su WP-CLI per gestire escaping complesso
# Il JSON viene passato come file PHP temporaneo sul server

SSH_SCRIPT="/Users/mac/.config/lucasammarco/ssh-wp.sh"
JSON_DIR="/Users/mac/lucasammarco-react/elementor-migration/json"

# Leggi la configurazione SSH dallo script
SSH_KEY="/Users/mac/.config/lucasammarco/ssh_key"
SSH_HOST="ssh.lucasammarco.com"
SSH_PORT="18765"
SSH_USER="u1085-xyfhlpnvjqjk"
SSH_REMOTE_DIR="www/lucasammarco.com/public_html"

scp_and_deploy() {
    local ID=$1
    local TYPE=$2  # wp-post or wp-page
    local JSON_FILE=$3

    echo ""
    echo "--- Processing ID $ID ---"

    # SCP del file JSON al server
    scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
        -P "$SSH_PORT" -i "$SSH_KEY" \
        "$JSON_FILE" \
        "${SSH_USER}@${SSH_HOST}:${SSH_REMOTE_DIR}/wp-content/elementor_tmp_${ID}.json"

    if [ $? -ne 0 ]; then
        echo "ERROR: SCP failed for ID $ID"
        return 1
    fi
    echo "JSON uploaded for ID $ID"

    # Esegui WP-CLI usando lo script SSH wrapper
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp post meta update ${ID} _elementor_edit_mode 'builder'"
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp post meta update ${ID} _elementor_template_type '${TYPE}'"
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp post meta update ${ID} _elementor_version '3.21.0'"

    # Aggiorna _elementor_data dal file caricato
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp eval 'update_post_meta(${ID}, \"_elementor_data\", file_get_contents(ABSPATH . \"wp-content/elementor_tmp_${ID}.json\")); echo \"Updated ${ID}\";'"

    # Elimina CSS per rigenerazione
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp post meta delete ${ID} _elementor_css 2>/dev/null; echo 'CSS meta cleared for ${ID}'"
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp post meta update ${ID} _elementor_page_settings '{}'"

    # Rimuovi file temporaneo
    $SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && rm -f wp-content/elementor_tmp_${ID}.json"

    echo "Deployed ID $ID successfully"
}

echo "=== ELEMENTOR MIGRATION DEPLOY (SCP + PHP) ==="

# POSTS
echo ""
echo "--- POSTS ---"
scp_and_deploy 7221 "wp-post" "$JSON_DIR/post_7221.json"
scp_and_deploy 7222 "wp-post" "$JSON_DIR/post_7222.json"
scp_and_deploy 7223 "wp-post" "$JSON_DIR/post_7223.json"

# GEO-PAGES
echo ""
echo "--- GEO-PAGES ---"
scp_and_deploy 7224 "wp-page" "$JSON_DIR/page_7224.json"
scp_and_deploy 7225 "wp-page" "$JSON_DIR/page_7225.json"
scp_and_deploy 7226 "wp-page" "$JSON_DIR/page_7226.json"
scp_and_deploy 7227 "wp-page" "$JSON_DIR/page_7227.json"
scp_and_deploy 7228 "wp-page" "$JSON_DIR/page_7228.json"
scp_and_deploy 7229 "wp-page" "$JSON_DIR/page_7229.json"
scp_and_deploy 7230 "wp-page" "$JSON_DIR/page_7230.json"
scp_and_deploy 7231 "wp-page" "$JSON_DIR/page_7231.json"

# FLUSH
echo ""
echo "--- FLUSH ---"
$SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp elementor flush-css"
$SSH_SCRIPT "cd ${SSH_REMOTE_DIR} && wp cache flush"

echo ""
echo "=== DONE ==="
