import defaultOptions from '../defaultOptions'
import Overlay from './Overlay'

const { runtime } = browser

let options;
let delayedInit;

const statePromise = new Promise((resolve, reject) => {
    options = JSON.parse(localStorage.getItem('layoutLensState'))
    if (options) {
        resolve('Layout lens options found')
    } else {
        options = defaultOptions
        console.table(options)
        localStorage.setItem('layoutLensState', JSON.stringify(options))
        reject('Layout lens options set')
    }
})

const statePromiseOnResolve = (res) => {
    console.log(res)
    init(options);
}
const statePromiseOnReject = (reason) => {
    console.log(reason)
    init(options);
}

statePromise.then(statePromiseOnResolve).catch(statePromiseOnReject);

const cleanUp = () => {
    if (delayedInit) clearInterval(delayedInit)

    const layoutLensContainer = document.querySelector('.layoutlens__container')
    if (layoutLensContainer) layoutLensContainer.remove()
}

const main = () => {
    const eles = document.querySelectorAll('*')

    let layoutLensContainer = document.querySelector('.layoutlens__container') || document.createElement('div')

    layoutLensContainer.style.opacity = options.opacity
    layoutLensContainer.classList.add('layoutlens__container')
    document.body.appendChild(layoutLensContainer)

    function addLens(ele, container) {
        if (!options.tagnames[ele.tagName]) return
        const overlay = document.createElement('div')
        const margin = document.createElement('div')
        const padding = document.createElement('div')

        let str = ''
        ele.classList.forEach(classname => str += `${classname} `)

        if (ele.id) {
            overlay.setAttribute('data-id', ele.id)
        }
        
        if (str) {
            overlay.setAttribute('data-class', str)
        }

        overlay.setAttribute('aria-hidden', 'true')  
        overlay.classList.add('layoutlens__overlay')
        margin.classList.add('layoutlens__margin')
        padding.classList.add('layoutlens__padding')

        updateOverlayPosition(ele, overlay)
    
        overlay.appendChild(margin)
        overlay.appendChild(padding)

        updateOverlayStyles(ele, overlay, margin, padding)
        container.appendChild(overlay)
    };

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

const init = (message = false) => {
    if (message) options = message
    cleanUp()
    if (options.appToggle) main()
}

runtime.onMessage.addListener(message => {
    localStorage.setItem('layoutLensState', JSON.stringify(message))
    init(message)
})