$(document).ready(function () {
    //my code

    $slick_slider = $('.slick');
    settings = {
        // some settings
        dots: true,
        arrows:false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight:true
    }
    $slick_slider.slick(settings);

    // reslick only if it's not slick()
    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            if ($slick_slider.hasClass('slick-initialized')) {
                $slick_slider.slick('unslick');
            }
            return
        }

        if (!$slick_slider.hasClass('slick-initialized')) {
            return $slick_slider.slick(settings);
        }
    });
});
