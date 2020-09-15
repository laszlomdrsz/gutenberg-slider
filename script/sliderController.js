jQuery(document).ready(function ($) {
    const sliders = registerSlides();
    refreshSliders();

    $('.ov-prev-button').click(function () {
        const sliderId = $(this).data('client-id');
        changeSlide(sliderId, 'PREV');
    })
    $('.ov-next-button').click(function () {
        const sliderId = $(this).data('client-id');
        changeSlide(sliderId, 'NEXT');
    })


    function registerSlides () {
        const slides = $('.ov-slide');
        const sliders = {};
        slides.each(function() {
            const sliderId = $(this).data('parent-client-id');
            const slideId = $(this).data('client-id');
            if (sliders.hasOwnProperty(sliderId)) {
                sliders[sliderId].slides.push(slideId);
            } else {
                sliders[sliderId] = {
                    currentSlide: slideId,
                    slides: [slideId],
                }
            }
        })
        return sliders;
    }

    function changeSlide(sliderId, direction) {
        const modifiedSlider = sliders[sliderId];
        const currentSlideId = modifiedSlider.currentSlide;
        const currentSliderIndex = modifiedSlider.slides.indexOf(currentSlideId);
        if (direction === 'NEXT') {
            if (currentSliderIndex !== modifiedSlider.slides.length - 1) {
                modifiedSlider.currentSlide = modifiedSlider.slides[currentSliderIndex + 1];
            } else {
                modifiedSlider.currentSlide = modifiedSlider.slides[0];
            }
        } else if (direction === 'PREV') {
            if (currentSliderIndex !== modifiedSlider.slides.length - 1) {
                modifiedSlider.currentSlide = modifiedSlider.slides[currentSliderIndex + 1];
            } else {
                modifiedSlider.currentSlide = modifiedSlider.slides[0];
            }
        }
        refreshSliders();
    }

    function refreshSliders() {
        const slides = $('.ov-slide');
        slides.each(function() {
            const sliderId = $(this).data('parent-client-id');
            const slideId = $(this).data('client-id');
            if (sliders[sliderId].currentSlide === slideId) {
                $(this).addClass('ov-slide-active');
            } else {
                $(this).removeClass('ov-slide-active');
            }
        })
    }
})

