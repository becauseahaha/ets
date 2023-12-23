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

    if (id == 'popup-menu' && window.innerWidth > 420) {
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
    if (window.innerWidth > 767) return;
    document.querySelectorAll('.js-contacts-card .contacts-card__city').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.js-contacts-card').forEach((el) => {
                el.classList.remove('is-active');
            })
            el.closest('.js-contacts-card').classList.toggle('is-active');
        })
    })
}

const fileButtons = () => {
    document.querySelectorAll('.js-file-btn').forEach((el) => {
        el.addEventListener('change', function() {
            if (this.files[0] === undefined || this.files[0].name.length == 0) return;
            const file = this.files[0];
            const parent = el.closest('label');
            parent.classList.add('is-active');
            parent.querySelector('.btn-file__name').innerText = file.name;
            el.addEventListener('click', () => {
                parent.classList.remove('is-active');
                parent.querySelector('.js-file-btn').value = null;
            }, {once: true})
        })
    })
}

const forms = () => {

    function resizeForms() {
        document.querySelectorAll('.js-form-steps').forEach((el) => {
            const parent = document.getElementById('block-request');
            const w =  (window.innerWidth >= 1280 ? parent.clientWidth/2 : parent.clientWidth) - parseInt(getComputedStyle(el.closest('.request__form')).padding)*2;
            el.style.width = w + 'px';
            el.querySelectorAll('.js-form-step').forEach((el) => {
                el.style.width = w + 'px';
            })
        })
    }

    window.addEventListener('resize', resizeForms);
    resizeForms();

    const form1 = document.getElementById('form-1');
    const form2 = document.getElementById('form-2');
    const form3 = document.getElementById('form-3');

    const form1_submit = form1.querySelector('.js-submit');
    const form2_submit = form2.querySelector('.js-submit');
    const form3_submit = form3.querySelector('.js-submit');

    form1.dataset.step = 1;
    form2.dataset.step = 1;

    form3_submit.addEventListener('click', () => {

        form3.dataset.errors = 0;

        const phone = form3.querySelector('input[name="phone"]');
        const message = form3.querySelector('[name="message"]');

        if (phone.value.length == 0) {
            phone.classList.add('is-error');
            form3.dataset.errors++;
        } else {
            phone.classList.remove('is-error');
        }
        if (message.value.length == 0) {
            message.classList.add('is-error');
            form3.dataset.errors++;
        } else {
            message.classList.remove('is-error');
        }

        if (form3.dataset.errors > 0) return;

        const formData = new FormData(form3);

        fetch("https://wikianime.tv/albion/mailer.php", {
            method: "POST",
            body: formData
        })
        .then(function(serverPromise) { 
            serverPromise.json()
            .then(function(data) { 
                form3.style.display = 'none';
                document.getElementById('form-3-success').style.display = 'flex';
            });
        });

    })
    
    form2_submit.addEventListener('click', () => {

        form2.dataset.errors = 0;

        const type = form2.querySelector('input[name="type"]');
        const amount = form2.querySelector('input[name="amount"]');
        const weight = form2.querySelector('input[name="weight"]');
        const phone = form2.querySelector('input[name="phone"]');

        if (form2.dataset.step == 1) {

            if (type.value.length == 0) {
                type.classList.add('is-error');
                form2.dataset.errors++;
            } else {
                type.classList.remove('is-error');
            }
            if (amount.value.length == 0) {
                amount.classList.add('is-error');
                form2.dataset.errors++;
            } else {
                amount.classList.remove('is-error');
            }
            if (weight.value.length == 0) {
                weight.classList.add('is-error');
                form2.dataset.errors++;
            } else {
                weight.classList.remove('is-error');
            }

            if (form2.dataset.errors > 0) return;

            form2.querySelectorAll('.js-form-step').forEach((el) => {
                el.style.left = (-1 * el.clientWidth) + 'px'
            })
            form2.querySelector('.js-current-step').innerText = '02';
            form2.dataset.step++;
            form2_submit.querySelector('span:first-child').innerText = 'Отправить';

        } else if (form2.dataset.step == 2) {

            if (phone.value.length == 0) {
                phone.classList.add('is-error');
                form2.dataset.errors++;
            } else {
                phone.classList.remove('is-error');
            }

            if (form2.dataset.errors > 0) return;

            const formData = new FormData(form2);

            fetch("https://wikianime.tv/albion/mailer.php", {
                method: "POST",
                body: formData
            })
            .then(function(serverPromise) { 
                serverPromise.json()
                .then(function(data) { 
                    form2.style.display = 'none';
                    document.getElementById('form-2-success').style.display = 'flex';
                });
            });
        }

    })
    
    form1_submit.addEventListener('click', () => {

        form1.dataset.errors = 0;

        const type = form1.querySelector('input[name="type"]');
        const phone = form1.querySelector('input[name="phone"]');

        if (form1.dataset.step == 1) {

            if (type.value.length == 0) {
                type.classList.add('is-error');
                form1.dataset.errors++;
            } else {
                type.classList.remove('is-error');
            }

            if (form1.dataset.errors > 0) return;

            form1.querySelectorAll('.js-form-step').forEach((el) => {
                el.style.left = (-1 * el.clientWidth) + 'px'
            })
            form1.dataset.step++;
            form1_submit.querySelector('span:first-child').innerText = 'Отправить';

        } else if (form1.dataset.step == 2) {

            if (phone.value.length == 0) {
                phone.classList.add('is-error');
                form1.dataset.errors++;
            } else {
                phone.classList.remove('is-error');
            }

            if (form1.dataset.errors > 0) return;

            const formData = new FormData(form1);

            fetch("mailer.php", {
                method: "POST",
                body: formData
            })
            .then(function(serverPromise) { 
                serverPromise.json()
                .then(function(data) { 
                    form1.style.display = 'none';
                    document.getElementById('form-1-success').style.display = 'flex';
                });
            });
        }

    })

}

const countriesSlider = () => {

    if (window.innerWidth < 1280) return;

    const container = document.getElementById('countries-slider');
    container.addEventListener('mousemove', function(e) {

        const offsetPercentage = e.clientX / (document.body.clientWidth/100)
        const sliderOnePerc = container.clientWidth/100

        container.scrollTo({
            left: sliderOnePerc * offsetPercentage - container.clientWidth/3
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
    fileButtons();
    forms();
    countriesSlider();

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