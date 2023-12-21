document.querySelectorAll('.js-popup-show').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup(el.dataset.target);
    })
})
document.querySelectorAll('.js-popup-hide').forEach((el) => {
    el.addEventListener('click', hidePopup.bind(el));
})

function hidePopup(id) {

    let popup = document.getElementById(id) ? document.getElementById(id) : this.closest('.popup');

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains('is-shown')) {
        popup.addEventListener('transitionend', (e) => {
            popup.style.display = 'none';
            popup.dataset.processing = false;
        }, {
            once: true
        })
        popup.classList.remove('is-shown');
    } 

}
function showPopup(id) {

    if (id != 'popup-menu') hidePopup('popup-menu')
    if (id == 'popup-politics') hidePopup('popup-reservation')

    let popup = document.getElementById(id);

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (id == 'popup-menu' && document.body.clientWidth > 420) {
        let menu_btn_offetX = document.getElementById('btn-show-menu').getBoundingClientRect().x;
        document.querySelector('.popup__menu').style.paddingLeft = menu_btn_offetX + 'px';
    }

    if (popup.classList.contains('is-shown') == false) {
        popup.style.display = 'block';
        setTimeout(function() {
            popup.classList.add('is-shown')
            popup.dataset.processing = false;
        }, 1)
    }
}

const map = () => {
    const buttons = document.querySelectorAll('.js-map-btn');
    const layers  = document.querySelectorAll('.js-map-layer');
    buttons.forEach((btn) => {
        btn.addEventListener('click', function() {
            buttons.forEach((el) => {
                el.classList.remove('is-active')
            })
            layers.forEach((el) => {
                el.classList.remove('is-active')
            })
            this.classList.add('is-active')
            document.getElementById(this.dataset.target).classList.add('is-active');

        })
    })
}

const headerSlider = () => {
    const container = document.querySelector('.js-main-bgs-container');
    const slides = container.querySelectorAll('.js-main-bg');
    let i = 0, next_i = i+1, prev_i = slides.length-1;

    function changeSlides() {
        slides[prev_i].classList.remove('is-active');
        slides[i].classList.add('is-active');
        slides[i].classList.remove('is-next');
        slides[next_i].classList.add('is-next');
        prev_i = i;
        i++;
        if (i == slides.length) i = 0;
        next_i = i+1;
        if (next_i == slides.length) next_i = 0;
    }
    changeSlides();
    setInterval(changeSlides, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    map();
    headerSlider();
})