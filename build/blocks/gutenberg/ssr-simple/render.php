<?php
// Exit if accessed directly for security
if (! defined('ABSPATH')) {
    exit;
}

$text = $attributes['text'] ?? 'Simple SSR';

$blockProps = get_block_wrapper_attributes([
    'class' => 'bg-blue-600 p-10 wppg-next-ssr-simple-render'
]);
?>
<div <?php echo $blockProps; ?>>
    <div class="text-white text-3xl capitalize font-bold"><?php echo esc_html($text); ?></div>
</div>