import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

export default class Slick {
    constructor() {
        this.init();
    }

    init(){
        this.announcedSliderInit();
    }
    announcedSliderInit(){

        $(document).find('.announced-slick').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            const $progress = $(this).closest('section').find('.slider-progress');
            $slider.find('.announced-item').each(function (){
                const $item = $(this);
                $item.wrap( "<div></div>" );
            });
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                responsive: [

                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
    }
}

