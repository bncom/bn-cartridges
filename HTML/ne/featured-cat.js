//$(document).ready(function () {
//    var isMobile = false;
//    var URLpathArray = window.location.pathname.split('/');
//    if (URLpathArray[1].toLowerCase() === "mobile" || URLpathArray[2].toLowerCase() === "gs" || window.location.hostname === "m.barnesandnoble.com" || window.location.hostname === "mbarnesandnoble.skavaone.com" || window.location.hostname === "mpreprod.barnesandnoble.com" || window.location.hostname === "mpreview.barnesandnoble.com") {
//        isMobile = true;
//    }
//
//    if (isMobile === true) {
//        $('.row.featured-link-container').remove('.clearfix');
//        $('.row.featured-link-container').addClass('slick-feat-cat');
//
//        var slickFeatCat = function () {
//            $slick_slider = $('.slick-feat-cat');
//
//            settings = {
//                // slick settings
//                dots: true,
//                arrows: false,
//                speed: 500,
//                cssEase: 'linear',
//                adaptiveHeight: true,
//                respondTo: 'window',
//                infinite: false
//            }
//
//            $slick_slider.slick(settings);
//        }
//        // reslick only if it's not slick()
//        $(window).on('resize', function () {
//
//            if ($(window).width() > 768) {
//
//                if ($slick_slider.hasClass('slick-initialized')) {
//                    $slick_slider.slick('unslick');
//                }
//                return
//            } else {
//                slickFeatCat();
//            }
//
//            if (!$slick_slider.hasClass('slick-initialized')) {
//                slickFeatCat();
//
//                return $slick_slider.slick(settings);
//            }
//
//        });
//        if ($(window).width() < 768) {
//            slickFeatCat();
//        }
//    }
//});

var isMobile = false;
var URLpathArray = window.location.pathname.split('/');
if (URLpathArray[1].toLowerCase() === "mobile" || URLpathArray[2].toLowerCase() === "gs" || window.location.hostname === "m.barnesandnoble.com" || window.location.hostname === "mbarnesandnoble.skavaone.com" || window.location.hostname === "mpreprod.barnesandnoble.com" || window.location.hostname === "mpreview.barnesandnoble.com") {
    isMobile = true;
}

if (isMobile === true) {
    $('.row.featured-link-container').remove('.clearfix.slick-slide');
    $('.row.featured-link-container').addClass('slick-feat-cat');
    $('ul.slick-dots.focus').children().last().remove();
    var slickFeatCat = function () {

        $slick_slider = $('.slick-feat-cat');

        settings = {
            // slick settings
            dots: true,
            arrows: false,
            speed: 500,
            cssEase: 'linear',
            adaptiveHeight: true,
            respondTo: 'window',
            infinite: false
        }

        $slick_slider.slick(settings);
    }
    slickFeatCat();
}