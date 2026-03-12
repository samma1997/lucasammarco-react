<?php
/**
 * Script PHP per aggiornare _elementor_data da file JSON locali.
 * Eseguito tramite WP-CLI: wp eval-file update_elementor.php
 *
 * I file JSON devono essere presenti nella stessa directory dello script.
 */

global $wpdb;

// Directory dei file JSON (relativa al document root)
$json_dir = '/home/customer/www/lucasammarco.com/public_html/wp-content/elementor_json/';

$updates = [
    // [post_id, template_type, json_filename]
    [7221, 'wp-post', 'post_7221.json'],
    [7222, 'wp-post', 'post_7222.json'],
    [7223, 'wp-post', 'post_7223.json'],
    [7224, 'wp-page', 'page_7224.json'],
    [7225, 'wp-page', 'page_7225.json'],
    [7226, 'wp-page', 'page_7226.json'],
    [7227, 'wp-page', 'page_7227.json'],
    [7228, 'wp-page', 'page_7228.json'],
    [7229, 'wp-page', 'page_7229.json'],
    [7230, 'wp-page', 'page_7230.json'],
    [7231, 'wp-page', 'page_7231.json'],
];

foreach ($updates as [$post_id, $template_type, $json_file]) {
    $json_path = $json_dir . $json_file;

    if (!file_exists($json_path)) {
        echo "ERROR: File not found: $json_path\n";
        continue;
    }

    $json_content = file_get_contents($json_path);

    // Validate JSON
    $decoded = json_decode($json_content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "ERROR: Invalid JSON for $post_id: " . json_last_error_msg() . "\n";
        continue;
    }

    echo "Processing ID $post_id ($template_type): " . count($decoded) . " top-level elements\n";

    // Update _elementor_edit_mode
    update_post_meta($post_id, '_elementor_edit_mode', 'builder');

    // Update _elementor_template_type
    update_post_meta($post_id, '_elementor_template_type', $template_type);

    // Update _elementor_version
    update_post_meta($post_id, '_elementor_version', '3.21.0');

    // Update _elementor_data DIRECTLY via wpdb to bypass wp_slash()
    $existing = $wpdb->get_var($wpdb->prepare(
        "SELECT meta_id FROM {$wpdb->postmeta} WHERE post_id = %d AND meta_key = '_elementor_data' LIMIT 1",
        $post_id
    ));

    if ($existing) {
        $result = $wpdb->update(
            $wpdb->postmeta,
            ['meta_value' => $json_content],
            ['post_id' => $post_id, 'meta_key' => '_elementor_data'],
            ['%s'],
            ['%d', '%s']
        );
    } else {
        $result = $wpdb->insert(
            $wpdb->postmeta,
            ['post_id' => $post_id, 'meta_key' => '_elementor_data', 'meta_value' => $json_content],
            ['%d', '%s', '%s']
        );
    }

    if ($result !== false) {
        echo "  _elementor_data: OK (" . strlen($json_content) . " bytes)\n";
    } else {
        echo "  _elementor_data: FAILED - " . $wpdb->last_error . "\n";
        continue;
    }

    // Clear elementor CSS cache for this post
    delete_post_meta($post_id, '_elementor_css');
    echo "  _elementor_css: cleared\n";

    // Clear wp_cache for this post meta
    wp_cache_delete($post_id, 'post_meta');

    // Use Elementor API to rebuild the post_content from elementor_data
    if (class_exists('\Elementor\Plugin')) {
        try {
            $document = \Elementor\Plugin::instance()->documents->get($post_id, false);
            if ($document) {
                // Reload meta after direct DB write
                clean_post_cache($post_id);
                $fresh_data = $wpdb->get_var($wpdb->prepare(
                    "SELECT meta_value FROM {$wpdb->postmeta} WHERE post_id = %d AND meta_key = '_elementor_data' LIMIT 1",
                    $post_id
                ));
                $elements = json_decode($fresh_data, true);

                // Save via document (regenerates post_content)
                $document->save(['elements' => $elements]);
                echo "  document->save(): OK\n";
            } else {
                echo "  document->save(): No document found\n";
            }
        } catch (Exception $e) {
            echo "  document->save(): ERROR - " . $e->getMessage() . "\n";
        }
    }

    echo "  Done ID $post_id\n\n";
}

// Flush Elementor CSS
if (class_exists('\Elementor\Core\Files\Manager')) {
    \Elementor\Plugin::instance()->files_manager->clear_cache();
    echo "Elementor files cache cleared\n";
}

wp_cache_flush();
echo "WP cache flushed\n";
echo "\nAll done!\n";
