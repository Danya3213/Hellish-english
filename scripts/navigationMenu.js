const burgerButton = document.getElementById('burgerButton');
const adaptiveShows = document.querySelectorAll('#adaptiveShow');

let burgerButtonIsActive = false;
let headerAdaptive = false;

function burgerButtonActivity() {

    burgerButtonIsActive = !burgerButtonIsActive;
    headerAdaptive = !headerAdaptive;

    burgerButton.classList.toggle('_button-active');

    for (adaptiveShow of adaptiveShows) {

        adaptiveShow.classList.toggle('_adaptive');
    }

    if (burgerButtonIsActive) {

        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeyScroll);
    } else {

        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
    }
}

function preventScroll(event) {
    if (burgerButtonIsActive) {
        event.preventDefault();
    }
}

function preventKeyScroll(event) {
    if (burgerButtonIsActive && (event.key === ' ' || event.key === 'Spacebar' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'PageUp' || event.key === 'PageDown')) {
        event.preventDefault();
    }
}

burgerButton.onclick = burgerButtonActivity;