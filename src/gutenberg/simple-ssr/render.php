<?php
// Exit if accessed directly for security
if (! defined('ABSPATH')) {
    exit;
}

$text = $attributes['text'] ?? 'Simple SSR';
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="wppg-next-simple-ssr">
        <h1><?php echo esc_html($text); ?></h1>
    </div>
</div>