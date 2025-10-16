<?php
if (! defined('ABSPATH')) {
    exit;
}

$title = isset($attributes['title']) && $attributes['title'] !== ''
    ? $attributes['title']
    : 'Frequently asked questions';


$classes = '';
if (! empty($attributes['className'])) {
    $classes .= ' ' . sanitize_html_class($attributes['className']);
}
?>

<section class="<?php echo esc_attr($classes); ?> py-10 pb-10">
    <div class="container grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 font-host text-neutral-coffee-05 px-4 md:px-[2.2rem] text-base">

        <!-- Column 1: Title -->
        <div class="lg:col-span-3 flex flex-col justify-between h-full">

            <h2 class="text-[1.9rem] font-light mb-14"><?php echo esc_html($title); ?></h2>
        </div>

        <!-- Column 2: Main Content -->
        <div class="lg:col-span-9 space-y-6 flex flex-col gap-10 faq-section-content">

            <?php echo $content; ?>
        </div>
    </div>
</section>