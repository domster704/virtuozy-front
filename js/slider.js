class Slider {
    /**
     * @param sliderContainer {HTMLElement}
     * @param direction {number} - 1 for bottom/right, -1 for top/left
     * @param [timeout=1000] {number}
     */
    constructor(sliderContainer, direction, timeout = 1500) {
        this.sliderContainer = sliderContainer;
        this.direction = direction;
        this.timeout = timeout;
        this.init();
    }

    init() {
        if (this.interval) {
            this.#clearSlide();
        }
        this.sliderElements = this.sliderContainer.querySelectorAll('img');

        this.maxVisibleSliderElements = Math.floor(this.sliderContainer.clientWidth / this.sliderElements[0].clientWidth);
        this.deltaElements = this.sliderContainer.children.length - this.maxVisibleSliderElements;
        this.currentSlide = this.direction === 1 ? 0 : this.deltaElements;

        this.interval = setInterval(this.#slide.bind(this), this.timeout + Math.ceil(Math.random() * this.timeout));
    }

    #slide() {
        this.sliderContainer.scroll({
            top: 0,
            left: this.currentSlide * this.sliderElements[0].clientWidth,
            behavior: 'smooth'
        });

        this.currentSlide += this.direction;

        switch (this.direction) {
            // right
            case 1:
                if (this.currentSlide > this.deltaElements) {
                    this.currentSlide = 0;
                }
                break;
            // left
            case -1:
                if (this.currentSlide < 0) {
                    this.currentSlide = this.deltaElements;
                }
                break;
        }
    }

    #clearSlide() {
        clearInterval(this.interval);
    }
}

let sliderRight;
let sliderLeft;

window.addEventListener('load', () => {
    const galleySlider = document.getElementById('gallerySlider');
    const galleryRowsRight = galleySlider.querySelector('.gallery_row_right');
    // const galleryRowsLeft = galleySlider.querySelector('.gallery_row_left');

    sliderRight = new Slider(galleryRowsRight, 1);
    // sliderLeft = new Slider(galleryRowsLeft, -1);
});

window.addEventListener('resize', () => {
    if (!sliderLeft || !sliderRight) {
        return;
    }
    sliderRight.init();
    sliderLeft.init();
});