<?php

defined('ABSPATH') || exit;


if ($isTable) : ?>

    <h1 class="wp-heading-inline">
        <?php esc_html_e('AI Robots', 'wpp-generator-v2'); ?>
    </h1>

    <a href="<?php echo admin_url('admin.php?page=main-menu'); ?>" class="page-title-action">
        <?php esc_html_e('Add New', 'wpp-generator-v2'); ?>
    </a>

    <hr class="wp-header-end">

    <?php 
    $tableInstance->prepare_items();

    $tableInstance->views();

    echo '<form id="' . $uniqueString . '_custom_talbe_search_form" method="post">';

        $tableInstance->search_box(esc_html__('Search Robots', 'wpp-generator-v2'), '' . $uniqueString . '_robots_talbe_search_input');
    echo '</form>';

    echo '<form id="' . $uniqueString . '_custom_talbe_form" method="post">';

        $tableInstance->display();
    echo '</form>';
else :

    printf('<strong>%s</strong>', $message);
endif;