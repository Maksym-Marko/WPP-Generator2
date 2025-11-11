/**
 * Slider Multiple Items.
 */
const mxsfwnSliderMultipleHorizontal = window.mxsfwnSliderMultipleHorizontal || {

    sectionWrapper: '.mxsfwn-multiple-slider-horizontal-section',
    sliderWrapper: '.mxsfwn-slider-multiple-items',
    navWrapper: '.mxsfwn-slider-nav-wrapper',
    prevButton: '.mxsfwn-slider-nav-prev',
    nextButton: '.mxsfwn-slider-nav-next',
    slide: '.mxsfwn-slider-multiple-item',
    dataKey: 'data-parent-class',

    getUniqueClass: function () {
        return 'cb' + Math.random().toString(36).substring(2, 10);
    },

    eqHeight: function () {
        const self = this;

        $(self.sectionWrapper).each(function () {
            const $section = $(this);
            const $slider = $section.find(self.sliderWrapper);

            if (!$slider.length || !$slider.hasClass('slick-initialized')) return;

            // Target only direct children, skip clones’ inner wrappers if desired (kept included for consistency)
            const $targets = $slider.find('.slick-slide > div');

            if (!$targets.length) return;

            // Reset before measuring
            $targets.css('height', '');

            // Measure
            let maxH = 0;
            $targets.each(function () {
                const h = $(this).outerHeight(); // padding included, margin excluded
                if (h > maxH) maxH = h;
            });

            if (maxH > 0) {
                $targets.css('height', maxH + 'px');
            }
        });
    },

    // Simple debounce helper for resize
    _debounceTimer: null,
    debounceEqHeight: function (delay = 100) {
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => this.eqHeight(), delay);
    },

    toggleNavigation: function (slick) {
        if (!slick || !slick.$slider) return;

        const enoughSlides = slick.slideCount > slick.options.slidesToShow;
        const shouldShowNav = enoughSlides;

        const sliderElement = slick.$slider[0];
        const parentClass = $(sliderElement).attr(this.dataKey);
        if (!parentClass) return;

        const $nav = $(`.${parentClass}`).find(this.navWrapper);
        if (!shouldShowNav) {
            $nav.hide();
        } else {
            $nav.show();
        }
    },

    _bindSlickEqHeightEvents: function ($slider) {
        const self = this;

        // Run on init and on various rerender-ish events
        $slider
            .on('init', function (e, slick) {
                self.toggleNavigation(slick);
                // Give the browser a tick in case images affect height
                requestAnimationFrame(() => self.eqHeight());
                setTimeout(() => self.eqHeight(), 0);
            })
            .on('reInit setPosition breakpoint afterChange', function () {
                self.eqHeight();
            })
            .on('lazyLoaded', function () {
                // When images load, heights can change
                self.eqHeight();
            });
    },

    initSlider: function () {
        const self = this;

        const sections = $(this.sectionWrapper);
        if (!sections.length) return;

        sections.each(function () {
            const $section = $(this);
            const $slider = $section.find(self.sliderWrapper);
            if (!$slider.length) return;

            const uniqueClass = self.getUniqueClass();
            $section.addClass(uniqueClass);
            $slider.attr(self.dataKey, uniqueClass);

            self._bindSlickEqHeightEvents($slider);

            $slider.slick({
                centerMode: true,
                variableWidth: true,
                dots: false,
                infinite: true,
                arrows: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                pauseOnHover: true,
                responsive: [
                    {
                        breakpoint: 1220,
                        settings: { slidesToShow: 3, slidesToScroll: 1 }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false,
                            variableWidth: false
                        }
                    }
                ]
            });

            // Safety: equalize once more after first layout pass
            setTimeout(() => self.eqHeight(), 50);
        });

        // Recalculate on resize, debounced
        $(window).on('resize orientationchange', () => this.debounceEqHeight(120));
    },

    bindEvents: function () {
        const self = this;

        // Previous button click
        $(this.prevButton).on('click', function (e) {
            e.preventDefault();
            $(self.sliderWrapper).slick('slickPrev');
            self.eqHeight();
        });

        // Next button click
        $(this.nextButton).on('click', function (e) {
            e.preventDefault();
            $(self.sliderWrapper).slick('slickNext');
            self.eqHeight();
        });

        // If content inside slides changes dynamically (AJAX), watch DOM and re-eq
        if (typeof MutationObserver !== 'undefined') {
            const mo = new MutationObserver(() => self.debounceEqHeight(120));
            mo.observe(document.body, { childList: true, subtree: true });
        }
    },

    init: function () {
        this.initSlider();
        this.bindEvents();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    mxsfwnSliderMultipleHorizontal.init();
});

