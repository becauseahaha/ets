function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('is-active')) {
        hideMenu();
    } else {
        showMenu();
    }
}
function showMenu() {
    const menu = document.getElementById('menu');
    menu.classList.add('is-active');
}
function hideMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('is-active');
}

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

const vehicles = () => {
    const buttons = document.querySelectorAll('.js-vehicle-btn');
    const layers  = document.querySelectorAll('.js-vehicle-layer');
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
function showPopup(id, params) {


    let popup = document.getElementById(id);

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (id == 'popup-care-details') {
        popup.querySelector('.popup__title').innerHTML = params.title;
        popup.querySelector('.popup__body').innerHTML  = params.body;
    }

    if (popup.classList.contains('is-shown') == false) {
        popup.style.display = 'block';
        setTimeout(function() {
            popup.classList.add('is-shown')
            popup.dataset.processing = false;
        }, 1)
    }
}

const fixedHeader = () => {
    const firstScreenHeight = document.getElementById('first-screen').offsetHeight;
    window.addEventListener('scroll', () => {
        if (window.scrollY > firstScreenHeight) {
            document.getElementById('menu').classList.add('is-fixed');
        } else {
            document.getElementById('menu').classList.remove('is-fixed');
        }
    })
}

const clickToScroll = () => {
    document.querySelectorAll('.js-scroll-to').forEach((el) => {
        const scrollIntoViewWithOffset = (selector) => {
            window.scrollTo({
                behavior: "smooth",
                top:
                    document.querySelector(selector).getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    document.querySelector('.header').offsetHeight - 
                    20
            });
        };
        el.addEventListener('click', () => {
            hideMenu();
            scrollIntoViewWithOffset('#'+el.dataset.target);
        })
    })
}

const suggestions = () => {
    document.querySelectorAll('.js-suggestion').forEach((el) => {
        el.addEventListener('click', () => {
            document.getElementById( el.dataset.target ).value = el.innerText;
        })
    })
}

const contactsCards = () => {
    if (document.body.clientWidth > 767) return;
    document.querySelectorAll('.js-contacts-card .contacts-card__city').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.js-contacts-card').forEach((el) => {
                el.classList.remove('is-active');
            })
            el.closest('.js-contacts-card').classList.toggle('is-active');
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {

    map();
    vehicles();
    headerSlider();
    fixedHeader();
    clickToScroll();
    suggestions();
    contactsCards();

    document.querySelectorAll('.js-open-menu').forEach((el) => {
        el.addEventListener('click', toggleMenu);
    })

    document.querySelectorAll('.js-popup-hide').forEach((el) => {
        el.addEventListener('click', hidePopup.bind(el));
    })

    document.querySelectorAll('.js-popup-show').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            showPopup(el.dataset.target, el.dataset);
        })
    })

})