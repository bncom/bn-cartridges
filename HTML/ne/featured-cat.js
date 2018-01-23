$(document).ready(function () {
    var isMobile = false;
    var URLpathArray = window.location.pathname.split('/');
    if (URLpathArray[1].toLowerCase() === "mobile" || URLpathArray[2].toLowerCase() === "gs" || window.location.hostname === "m.barnesandnoble.com" || window.location.hostname === "mbarnesandnoble.skavaone.com" || window.location.hostname === "mpreprod.barnesandnoble.com" || window.location.hostname === "mpreview.barnesandnoble.com") {
        isMobile = true;
    }

    if (isMobile) {
        $('.row.featured-link-container').remove('.clearfix');
        $('.row.featured-link-container').addClass('slickFeatCat');

        var slickFeatCat = function () {
            $slick_slider = $('.slickFeatCat');

            settings = {
                // slick settings
                dots: true,
                arrows: false,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                adaptiveHeight: true,
                respondTo: 'window'

            }

            $slick_slider.slick(settings);
        }
        // reslick only if it's not slick()
        $(window).on('resize', function () {

            if ($(window).width() > 768) {

                $(".slick").addClass('fatcat');
                if ($slick_slider.hasClass('slick-initialized')) {
                    $slick_slider.slick('unslick');
                }
                return
            } else {
                slickFeatCat();
            }

            if (!$slick_slider.hasClass('slick-initialized')) {
                slickFeatCat();

                return $slick_slider.slick(settings);
            }

        });
        if ($(window).width() < 768) {
            slickFeatCat();
        }
    }
});
