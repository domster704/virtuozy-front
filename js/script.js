class ModalImage {
    IMG_LIST_SRC = [
        'assets/img/gallery/instagramm.png',
        'assets/img/gallery/img_1.png',
        'assets/img/gallery/img_2.png',
        'assets/img/gallery/img_3.png',
        'assets/img/gallery/img_4.png',
        'assets/img/gallery/img_5.png',
        'assets/img/gallery/img_6.png',
        'assets/img/gallery/img_7.png',
        'assets/img/gallery/img_8.png',
        'assets/img/gallery/img_9.png',
        'assets/img/gallery/img_10.png',
        'assets/img/gallery/img_11.png',
    ];

    constructor(modalNode) {
        this.modal = modalNode;
        this.#init()
    }

    #init() {
        this.modalImage = this.modal.querySelector('#modal_image');
        this.leftArrow = this.modal.querySelector('#arrow_left');
        this.rightArrow = this.modal.querySelector('#arrow_right');

        const popupCloseButton = this.modal.querySelector('#popup_close');
        const popupOverlay = this.modal.querySelector('.overlay');
        [popupCloseButton, popupOverlay].forEach(button => {
            button.addEventListener('click', () => {
                this.setActiveModal(false);
            });
        });

        this.currentImageIndex = 0;
        this.leftArrow.addEventListener('click', () => {
            if (this.currentImageIndex - 1 < 0) {
                this.currentImageIndex = this.IMG_LIST_SRC.length - 1;
            }
            this.currentImageIndex -= 1;
            this.setImageAttribute({
                src: this.IMG_LIST_SRC[this.currentImageIndex],
            });
        });
        this.rightArrow.addEventListener('click', () => {
            if (this.currentImageIndex + 1 >= this.IMG_LIST_SRC.length) {
                this.currentImageIndex = 0;
            }
            this.currentImageIndex += 1;
            this.setImageAttribute({
                src: this.IMG_LIST_SRC[this.currentImageIndex],
            });
        });
    }

    /**
     * @param obj {{[src]: string, [alt]: string, [title]: string}}
     */
    setImageAttribute(obj) {
        obj?.src && this.modalImage.setAttribute('src', obj.src);
        obj?.alt && this.modalImage.setAttribute('alt', obj.alt);
        obj?.title && this.modalImage.setAttribute('title', obj.title);
    }

    setActiveModal(isActive) {
        this.modal.classList.toggle('active', isActive);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenuButton = document.getElementById('burger_menu_button');
    const header = document.querySelector('header');

    burgerMenuButton.addEventListener('click', () => {
        burgerMenuButton.classList.toggle('active');
        header.classList.toggle('activeBurgerMenu');
    });

    // const contactsBlock = document.querySelector('.contacts');
    // const courseButton = document.querySelectorAll('.course button');


    const galleryImages = document.querySelectorAll('#gallerySlider img');

    const modalImage = new ModalImage(document.querySelector('#modal'));

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modalImage.setImageAttribute({
                src: image.getAttribute('src'),
                alt: image.getAttribute('alt'),
                title: image.getAttribute('title')
            })
            modalImage.setActiveModal(true);
        });
    });
});