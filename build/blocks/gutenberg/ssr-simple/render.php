<?php
// Exit if accessed directly for security
if (! defined('ABSPATH')) {
    exit;
}

$text = $attributes['text'] ?? 'Simple SSR';

$blockProps = get_block_wrapper_attributes(array(
    'class' => 'bg-blue-600 p-10 wppg-next-ssr-simple-render'
));
?>
<div <?php echo $blockProps; ?>>
    <div class="text-white text-3xl capitalize font-bold"><?php echo esc_html($text); ?></div>
</div>

<div class="p-10 bg-red-500 xs:bg-green-100 sm:bg-green-500 md:bg-yellow-500 lg:bg-purple-500 xl:bg-pink-500">
    123
</div>