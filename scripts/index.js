import defaultOptions from '../defaultOptions';
import Overlay from './Overlay';

const { onMessage } = browser.runtime;

// Initialize the script when loaded
init();

// Listen for messages and re-initialize on receiving a message
onMessage.addListener(message => init(message).catch(error => console.log(error)));

let delayedInit;

/**
 * Initializes the script with the provided message or default options.
 *
 * @param {Object} [message] - The message containing options for initialization.
 * @returns {Promise<void>}
 */
async function init(message) {
    let options;
    if (typeof message === 'object') {
        options = message;
        localStorage.setItem('layoutLensState', JSON.stringify(message));
    } else {
        options = (await JSON.parse(localStorage.getItem('layoutLensState'))) || defaultOptions;
    }

    cleanUp();

    if (options.appToggle) main(options);
}

/**
 * Cleans up existing overlays and observers.
 */
const cleanUp = () => {
    if (delayedInit) clearInterval(delayedInit);

    const layoutLensContainer = document.querySelector('.layoutlens__container');
    if (layoutLensContainer) layoutLensContainer.remove();
};

/**
 * Main functionality to set up the overlay based on provided options.
 *
 * @param {Object} options - The options for setting up the overlay.
 */
const main = options => {
    const eles = document.querySelectorAll('*');

    let layoutLensContainer = document.querySelector('.layoutlens__container') || document.createElement('div');

    layoutLensContainer.style.opacity = options.opacity;
    layoutLensContainer.classList.add('layoutlens__container');
    document.body.appendChild(layoutLensContainer);

    eles.forEach(ele => {
        resizeObserver.observe(ele);
        intersectionObserver.observe(ele);

        if (options.tagnames[ele.tagName] || options.tagnames['CUSTOM ELEMENTS'])
            layoutLensContainer.append(new Overlay(ele, '#ffaa33', '#33cc44').createOverlay());
    });
};

/**
 * Observer for monitoring element resize events and re-initializing the script.
 */
const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            clearTimeout(delayedInit);
            delayedInit = setTimeout(() => {
                init();
            }, 1);
        }
    }
});

/**
 * Observer for monitoring element intersection events and re-initializing the script.
 */
const intersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            clearTimeout(delayedInit);
            delayedInit = setTimeout(() => {
                console.log('INTERSECT');
                init();
            }, 1);
        }
    }
});
