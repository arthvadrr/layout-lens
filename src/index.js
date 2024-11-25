import defaultOptions from './defaultOptions.js';
import Overlay from "./classes/Overlay.js";

const {onMessage} = browser.runtime;

/**
 * Options for the intersection observer
 */
const intersectionObserverOptions = {
	root: document.querySelector("#scrollArea"),
	rootMargin: "0px",
	threshold: 1.0,
};

/**
 * Observer for monitoring element resize events and re-initializing the script.
 */
const resizeObserver = new ResizeObserver(entries => {
	for (const entry of entries) {
		if (entry.contentBoxSize) {
			// TODO Figure out how to resize specific elements
		}
	}
});

/**
 * Observer for monitoring element intersection events and re-initializing the script.
 */
const intersectionObserver = new IntersectionObserver(entries => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			// TODO Figure out how to re-position specific elements
		}
	}
}, intersectionObserverOptions);

/**
 * Self described
 */
init();
onMessage.addListener(message => init(message).catch(error => console.error(error)));

/**
 * Initializes the script with the provided message or default options.
 *
 * @returns {Promise<void>}
 */
async function init(message) {
	let options;
	const localOptions = JSON.parse(localStorage.getItem('layoutLensState'));

	console.log('message', message);

	if (message) {
		options = message;
	} else if (localOptions) {
		options = localOptions;
	} else {
		options = defaultOptions;
	}

	if (options) {
		localStorage.setItem('layoutLensState', JSON.stringify(options));
	}

	console.log('OPTIONS', options);

	if (options.appToggle) {
		cleanUp(false);
		main(options);
	} else {
		cleanUp(true);
	}
}

/**
 * Cleans up existing overlays and optionally disconnects observers.
 *
 * @param {boolean} removeObservers - Whether to disconnect the observers.
 */
const cleanUp = (removeObservers = false) => {
	const layoutLensContainer = document.querySelector('.layoutlens__container');
	if (layoutLensContainer) layoutLensContainer.remove();

	if (removeObservers) {
		resizeObserver.disconnect();
		intersectionObserver.disconnect();
	}
};

/**
 * Main functionality to set up the overlay based on provided options.
 *
 * @param {Object} options - The options for setting up the overlay.
 */
const main = options => {
	const layoutLensContainer =
		document.querySelector('.layoutlens__container') || createLayoutLensContainer(options.opacity);


	const eles = Array.from(document.querySelectorAll('body *')).filter(
		ele => options.tagnames[ele.tagName] || options.tagnames['CUSTOM ELEMENTS']
	);

	eles.forEach(ele => {
		resizeObserver.observe(ele);
		intersectionObserver.observe(ele);

		const overlay = new Overlay(ele).createOverlay();

		layoutLensContainer.appendChild(overlay);
	});

	document.body.appendChild(layoutLensContainer);
};

/**
 * Creates the container for the overlays.
 *
 * @param {string} opacity - The opacity to apply to the container.
 * @returns {HTMLElement} The created container element.
 */
const createLayoutLensContainer = opacity => {
	const container = document.createElement('div');
	container.classList.add('layoutlens__container');
	container.style.opacity = opacity;
	return container;
};