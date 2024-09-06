document.addEventListener('DOMContentLoaded', () => {
    // Handle carousel functionality, if applicable
    const carouselImages = document.querySelector('.carousel-images');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;

    if (carouselImages && prevButton && nextButton) {
        const totalSlides = carouselImages.children.length;

        // Function to update carousel slide position
        function updateCarousel() {
            carouselImages.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Event listener for the previous button
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
            updateCarousel();
        });

        // Event listener for the next button
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateCarousel();
        });
    }

    // If there is only one image, hide carousel controls
    if (carouselImages && carouselImages.children.length <= 1) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }

    // Scroll to top on page load (for a smooth UX if users come from different pages)
    window.scrollTo(0, 0);
});
