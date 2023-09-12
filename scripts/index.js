const { runtime, devtools } = browser

let options;

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
        options = {
            appToggle: false,
            opacity: 0.5,
            currentTab: 0,
            paddingColor: "#D8A658",
            marginColor: "#58CFD8"
        }
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
    console.log('clean')
    const layoutLensContainer = document.querySelector('.layoutlens__container')
    if (layoutLensContainer) layoutLensContainer.remove()
}


const updateOverlayStyles = (ele, color, overlay, margin, padding) => {
    const computedStyles = window.getComputedStyle(ele)
    const rect = ele.getBoundingClientRect()

    let fontSize = rect.height * 0.30;

    if (fontSize > 22) fontSize = 22
    else if (fontSize < 12) fontSize = 12

    const infoOverlay = document.createElement('div')
    
    overlay.innerText = `${ele.tagName}`

    infoOverlay.innerText = `
    ${ele.tagName}
    Padding ${computedStyles.padding}
    Margin ${computedStyles.margin}
    `

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

    function addLens(ele, color) {
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
        updateOverlayStyles(ele, color, overlay, margin, padding)

        // const mObserver = new MutationObserver(() => updateOverlayStyles(ele, color, overlay, margin, padding));
        // const iObserver = new IntersectionObserver(() => updateOverlayPosition(ele, overlay), {root: ele})
        // mObserver.observe(ele, mObserverConfig)
        // iObserver.observe(overlay)

        overlay.appendChild(margin)
        overlay.appendChild(padding)
        layoutLensContainer.appendChild(overlay)
    };

    const eleObj = {
        /* SECTIONING ROOT */
        "HTML": ele => addLens(ele, "#ff5826"),
        "BODY": ele => addLens(ele, "#ff5826"),
        /* CONTENT SECTIONING */
        "ADDRESS": ele => addLens(ele, "#ff8666"),
        "ARTICLE": ele => addLens(ele, "#ffbaa6"),
        "ASIDE": ele => addLens(ele, "#ffefe6"),
        "FOOTER": ele => addLens(ele, "#fffbeb"),
        "HEADER": ele => addLens(ele, "#ffffff"),
        "H1": ele => addLens(ele, "#ebffeb"),
        "H2": ele => addLens(ele, "#c4ffc4"),
        "H3": ele => addLens(ele, "#9dff9d"),
        "H4": ele => addLens(ele, "#76ff76"),
        "H5": ele => addLens(ele, "#4fff4f"),
        "H6": ele => addLens(ele, "#29ff29"),
        "HGROUP": ele => addLens(ele, "#00ff00"),
        "MAIN": ele => addLens(ele, "#23ff00"),
        "NAV": ele => addLens(ele, "#46ff00"),
        "SECTION": ele => addLens(ele, "#69ff00"),
        "SEARCH": ele => addLens(ele, "#8cff00"),
        /* TEXT CONTENT */
        "BLOCKQUOTE": ele => addLens(ele, "#afff00"),
        "DD": ele => addLens(ele, "#d2ff00"),
        "DIV": ele => addLens(ele, "#2D71C818"),
        "DL": ele => addLens(ele, "#ffff00"),
        "DT": ele => addLens(ele, "#ffff3f"),
        "FIGCAPTION": ele => addLens(ele, "#ffff7f"),
        "FIGURE": ele => addLens(ele, "#ffffbf"),
        "HR": ele => addLens(ele, "#ffffff"),
        "LI": ele => addLens(ele, "#ebffeb"),
        "MENU": ele => addLens(ele, "#c4ffc4"),
        "OL": ele => addLens(ele, "#9dff9d"),
        "P": ele => addLens(ele, "#76ff76"),
        "PRE": ele => addLens(ele, "#4fff4f"),
        "UL": ele => addLens(ele, "#29ff29"),
        /* INLINE TEXT SEMANTICS */
        "A": ele => addLens(ele, "#00ff00"),
        "ABBR": ele => addLens(ele, "#23ff00"),
        "B": ele => addLens(ele, "#46ff00"),
        "BDI": ele => addLens(ele, "#69ff00"),
        "BDO": ele => addLens(ele, "#8cff00"),
        "BR": ele => addLens(ele, "#afff00"),
        "CITE": ele => addLens(ele, "#d2ff00"),
        "CODE": ele => addLens(ele, "#f5ff00"),
        "DATA": ele => addLens(ele, "#ffff00"),
        "DFN": ele => addLens(ele, "#ffff3f"),
        "EM": ele => addLens(ele, "#ffff7f"),
        "I": ele => addLens(ele, "#ffffbf"),
        "KBD": ele => addLens(ele, "#ffffff"),
        "MARK": ele => addLens(ele, "#ebffeb"),
        "Q": ele => addLens(ele, "#c4ffc4"),
        "RP": ele => addLens(ele, "#9dff9d"),
        "RT": ele => addLens(ele, "#76ff76"),
        "RUBY": ele => addLens(ele, "#4fff4f"),
        "S": ele => addLens(ele, "#29ff29"),
        "SAMP": ele => addLens(ele, "#00ff00"),
        "SMALL": ele => addLens(ele, "#23ff00"),
        "SPAN": ele => addLens(ele, "#46ff00"),
        "STRONG": ele => addLens(ele, "#69ff00"),
        "SUB": ele => addLens(ele, "#8cff00"),
        "SUP": ele => addLens(ele, "#afff00"),
        "TIME": ele => addLens(ele, "#d2ff00"),
        "U": ele => addLens(ele, "#f5ff00"),
        "VAR": ele => addLens(ele, "#ffff00"),
        "WBR": ele => addLens(ele, "#ffff3f"),
        /* IMAGE AND MULTIMEDIA */
        "AREA": ele => addLens(ele, "#ffff7f"),
        "AUDIO": ele => addLens(ele, "#ffffff"),
        "IMG": ele => addLens(ele, "#ebffeb"),
        "MAP": ele => addLens(ele, "#c4ffc4"),
        "TRACK": ele => addLens(ele, "#9dff9d"),
        "VIDEO": ele => addLens(ele, "#76ff76"),
        /* EMBEDDED CONTENT */
        "EMBED": ele => addLens(ele, "#4fff4f"),
        "IFRAME": ele => addLens(ele, "#29ff29"),
        "OBJECT": ele => addLens(ele, "#00ff00"),
        "PICTURE": ele => addLens(ele, "#23ff00"),
        "PORTAL": ele => addLens(ele, "#46ff00"),
        "SOURCE": ele => addLens(ele, "#69ff00"),
        /* SVG AND MATHML */
        "SVG": ele => addLens(ele, "#8cff00"),
        "MATH": ele => addLens(ele, "#afff00"),
        /* SCRIPTING */
        "CANVAS": ele => addLens(ele, "#d2ff00"),
        "NOSCRIPT": ele => addLens(ele, "#f5ff00"),
        /* DEMARCATING EDITS */
        "DEL": ele => addLens(ele, "#ffff00"),
        "INS": ele => addLens(ele, "#ffff3f"),
        /* TABLE CONTENT */
        "CAPTION": ele => addLens(ele, "#ffff7f"),
        "COL": ele => addLens(ele, "#ffffff"),
        "COLGROUP": ele => addLens(ele, "#ebffeb"),
        "TABLE": ele => addLens(ele, "#c4ffc4"),
        "TBODY": ele => addLens(ele, "#9dff9d"),
        "TD": ele => addLens(ele, "#76ff76"),
        "TFOOT": ele => addLens(ele, "#4fff4f"),
        "TH": ele => addLens(ele, "#29ff29"),
        "THEAD": ele => addLens(ele, "#00ff00"),
        "TR": ele => addLens(ele, "#23ff00"),
        /* FORMS */
        "BUTTON": ele => addLens(ele, "#46ff00"),
        "DATALIST": ele => addLens(ele, "#69ff00"),
        "FIELDSET": ele => addLens(ele, "#8cff00"),
        "FORM": ele => addLens(ele, "#afff00"),
        "INPUT": ele => addLens(ele, "#d2ff00"),
        "LABEL": ele => addLens(ele, "#f5ff00"),
        "LEGEND": ele => addLens(ele, "#ffff00"),
        "METER": ele => addLens(ele, "#ffff3f"),
        "OPTGROUP": ele => addLens(ele, "#ffff7f"),
        "OPTION": ele => addLens(ele, "#ffffff"),
        "OUTPUT": ele => addLens(ele, "#ebffeb"),
        "PROGRESS": ele => addLens(ele, "#c4ffc4"),
        "SELECT": ele => addLens(ele, "#9dff9d"),
        "TEXTAREA": ele => addLens(ele, "#76ff76"),
        /* INTERACTIVE ELEMENTS */
        "DETAILS": ele => addLens(ele, "#4fff4f"),
        "DIALOG": ele => addLens(ele, "#29ff29"),
        "SUMMARY": ele => addLens(ele, "#00ff00"),
        /* WEB COMPONENTS */
        "SLOT": ele => addLens(ele, "#23ff00"),
        "TEMPLATE": ele => addLens(ele, "#46ff00"),
    }

    eles.forEach(ele => {
        resizeObserver.observe(ele)
        intersectionObserver.observe(ele)
        const { tagName } = ele
        if (tagName in eleObj) eleObj[tagName](ele);
        else addLens(ele, "#FF69B4")
    })
}

const init = message => {

    const container = document.querySelector('.layoutlens__container')

    options = message
    
    if (container) container.style.opacity = options.opacity

    if (options.appToggle && !container) main()
    else if (!options.appToggle && container) cleanUp()
}

let delayedInit;

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            clearTimeout(delayedInit)
            delayedInit = setTimeout(() => {
                cleanUp()
                main()
            }, 100)
        }
    }
})

const intersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            clearTimeout(delayedInit)
            delayedInit = setTimeout(() => {
                console.log('INTERSECT')
                cleanUp()
                main()
            }, 100)
        }
    }
})

runtime.onMessage.addListener(message => {
    localStorage.setItem('layoutLensState', JSON.stringify(message))
    init(message)
})