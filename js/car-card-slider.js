function prevCardSlide(id) {
    showCardSlides(-1, id);
}

function nextCardSlide(id) {
    showCardSlides(1, id);
}

function showCardSlides(num, id) {
    let sliderCount = document.getElementById(id).childElementCount;
    let currentSlide = document.querySelector(`#${id} .mySlide.active`);
    var slideIndex = parseInt(currentSlide.dataset.slideIndex);

    slideIndex += num;

    // Slider loop
    if (slideIndex > sliderCount) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = sliderCount; }

    currentSlide.classList.toggle("active");

    let newSlide = document.querySelectorAll(`#${id} .mySlide[data-slide-index~="${slideIndex}"]`)[0];
    newSlide.classList.toggle("active");
}