<?php

/**
 * VIEW.
 * 
 * Edit robot's page.
 * 
 * CONTROLLER: \includes\Admin\controllers\ai-robots-table\single.php
 */

defined('ABSPATH') || exit;

?>
<div class="mx-single-table-item-wrap">

    <h1><?php esc_html_e( 'Edit Table Item', 'wpp-generator-next' ); ?></h1>

    <a href="<?php echo esc_url_raw(admin_url("admin.php?page={$robotsTable->mainMenuSlug()}")); ?>">

        <?php esc_html_e( 'Go Back', 'wpp-generator-next' ); ?>
    </a>

    <br>
    <br>

    <div class="<?php echo esc_attr($robotsTable->getUniqueString()); ?>_block_wrap">

        <form 
            id="<?php echo esc_attr($robotsTable->getUniqueString()); ?>_form_update"
            class="mx-settings"
            method="post"
            action="<?= esc_url_raw(admin_url("admin.php?page={$robotsTable->getEditSlug()}")); ?>"
        >

            <input
                type="hidden"
                id="edit-item"
                name="edit-item"
                value="<?php echo esc_attr($robot->id); ?>"
            />

            <div>
                <label for="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-title">                    
                    <?php esc_html_e( 'Title', 'wpp-generator-next' ); ?>
                </label>

                <br>

                <input
                    type="text"
                    name="title"
                    id="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-title"
                    value="<?php echo esc_attr($robot->title); ?>"
                />
            </div>

            <br>

            <div>
                <label for="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-description">

                    <?php esc_html_e( 'Description', 'wpp-generator-next' ); ?>
                </label>

                <br>

                <textarea
                    name="description"
                    id="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-description"
                    rows="8"
                    cols="60"
                ><?php echo esc_textarea(trim($robot->description)); ?></textarea>
            </div>

            <p class="mx-submit_button_wrap">
                
                <input
                    type="hidden"
                    id="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-wp-nonce"
                    name="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-wp-nonce"
                    value="<?= wp_create_nonce("{$robotsTable->getUniqueString()}-edit"); ?>"
                />

                <input
                    class="button-primary"
                    type="submit"
                    name="<?php echo esc_attr($robotsTable->getUniqueString()); ?>-submit"
                    value="<?php esc_html_e( 'Save', 'wpp-generator-next' ); ?>"
                />
            </p>
        </form>
    </div>
</div>