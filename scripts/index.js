import defaultOptions from '../defaultOptions'
import Overlay from './Overlay'

const { onMessage } = browser.runtime

init()

onMessage.addListener(message => init(message).catch((error) => console.log(error)))

let delayedInit;

async function init(message) {
    let options;
    console.log(typeof message)
    if (typeof message === "object") {
        options = message
        await localStorage.setItem('layoutLensState', JSON.stringify(message))
    } else {
        options = await JSON.parse(localStorage.getItem('layoutLensState')) || defaultOptions
    }

    cleanUp()

    if (options.appToggle) main(options)
}

const cleanUp = () => {
    if (delayedInit) clearInterval(delayedInit)

    const layoutLensContainer = document.querySelector('.layoutlens__container')
    if (layoutLensContainer) layoutLensContainer.remove()
}

const main = options => {
    const eles = document.querySelectorAll('*')

    let layoutLensContainer = document.querySelector('.layoutlens__container') || document.createElement('div')

    layoutLensContainer.style.opacity = options.opacity
    layoutLensContainer.classList.add('layoutlens__container')
    document.body.appendChild(layoutLensContainer)

    eles.forEach(ele => {
        resizeObserver.observe(ele)
        intersectionObserver.observe(ele)

        if (
            options.tagnames[ele.tagname] ||
            options.tagnames['CUSTOM ELEMENTS']
        ) layoutLensContainer.append(new Overlay(
            ele,
            '#ffaa33',
            '#33cc44'
        ).createOverlay());
    })
}

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            clearTimeout(delayedInit)
            delayedInit = setTimeout(() => {
                init()
            }, 1)
        }
    }
})

const intersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            clearTimeout(delayedInit)
            delayedInit = setTimeout(() => {
                console.log('INTERSECT')
                init()
            }, 1)
        }
    }
})