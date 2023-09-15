import defaultOptions from '../defaultOptions'


const { runtime } = browser

let options;
let delayedInit;

const updateOverlayPosition = (ele, overlay) => {
    const rect = ele.getBoundingClientRect()
    const { scrollY, scrollX } = window
    overlay.style.top = `${rect.top + scrollY}px`
    overlay.style.left = `${rect.left + scrollX}px`
}


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


const updateOverlayStyles = (ele, overlay, margin, padding) => {
    const computedStyles = window.getComputedStyle(ele)
    const rect = ele.getBoundingClientRect()

    let fontSize = rect.height * 0.30;

    if (fontSize > 22) fontSize = 22
    else if (fontSize < 12) fontSize = 12

    const infoOverlay = document.createElement('div')
    infoOverlay.classList.add('layoutlens__info-overlay')

    infoOverlay.innerText = `${ele.tagName}`

    overlay.appendChild(infoOverlay)

    const styles = {
        padding: {
            top: computedStyles.paddingTop,
            bottom: computedStyles.paddingBottom,
            left: computedStyles.paddingLeft,
            right: computedStyles.paddingRight,
        },
        margin: {
            top: computedStyles.marginTop,
            bottom: computedStyles.marginBottom,
            left: computedStyles.marginLeft,
            right: computedStyles.marginRight,
        }
    }

    padding.style.borderBottom = `${styles.padding.bottom} solid ${options.paddingColor}`
    padding.style.borderTop = `${styles.padding.top} solid ${options.paddingColor}`
    padding.style.borderLeft = `${styles.padding.left} solid ${options.paddingColor}`
    padding.style.borderRight = `${styles.padding.right} solid ${options.paddingColor}`
    padding.style.borderRadius = `${computedStyles.borderRadius}`
    margin.style.borderBottom = `${styles.margin.bottom} solid ${options.marginColor}`
    margin.style.borderTop = `${styles.margin.top} solid ${options.marginColor}`
    margin.style.borderLeft = `${styles.margin.left} solid ${options.marginColor}`
    margin.style.borderRight = `${styles.margin.right} solid ${options.marginColor}`
    margin.style.top = `-${styles.margin.top}`
    margin.style.left = `-${styles.margin.left}`
    overlay.style.width = `${rect.width}px`
    overlay.style.height = `${rect.height}px`
    overlay.style.fontSize = `${fontSize}px`
    overlay.style.borderRadius = `${computedStyles.borderRadius}`
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
        const { tagName } = ele
        if (options.tagnames[`${tagName}`]) addLens(ele, layoutLensContainer);
        else if (options.tagnames['CUSTOM ELEMENTS']) addLens(ele, "#FF69B4")
    })
}

const init = (message = false) => {
    if (message) options = message
    cleanUp()
    if (options.appToggle) main()
}

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            clearTimeout(delayedInit)
            delayedInit = setTimeout(() => {
                init()
            }, 0)
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
            }, 0)
        }
    }
})

runtime.onMessage.addListener(message => {
    localStorage.setItem('layoutLensState', JSON.stringify(message))
    init(message)
})