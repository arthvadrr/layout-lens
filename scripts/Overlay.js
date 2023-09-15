class Overlay {
    constructor(
        ele,
        parent,
        marginColor,
        paddingColor
    ) {
        this.ele = ele
        this.container = parent
        this.marginColor = marginColor
        this.paddingColor = paddingColor
    }

    overlay = document.createElement('div')
    

    static updateOverlayPosition() {
        const { scrollY, scrollX } = window
        const rect = this.ele.getBoundingClientRect()
        this.overlay.style.top = `${rect.top + scrollY}px`
        this.overlay.style.left = `${rect.left + scrollX}px`
    }

    static createOverlay() {
        const margin = document.createElement('div')
        const padding = document.createElement('div')
        const computedStyles = window.getComputedStyle(this.ele)
        const rect = this.ele.getBoundingClientRect()
        const infoOverlay = document.createElement('div')

        let fontSize = rect.height * 0.30;

        infoOverlay.classList.add('layoutlens__info-overlay')
        infoOverlay.innerText = `${this.ele.tagName}`
    
        this.overlay.appendChild(infoOverlay)
    
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
    
        padding.style.borderBottom = `${styles.padding.bottom} solid ${this.paddingColor}`
        padding.style.borderTop = `${styles.padding.top} solid ${this.paddingColor}`
        padding.style.borderLeft = `${styles.padding.left} solid ${this.paddingColor}`
        padding.style.borderRight = `${styles.padding.right} solid ${this.paddingColor}`
        padding.style.borderRadius = `${computedStyles.borderRadius}`
        margin.style.borderBottom = `${styles.margin.bottom} solid ${this.marginColor}`
        margin.style.borderTop = `${styles.margin.top} solid ${this.marginColor}`
        margin.style.borderLeft = `${styles.margin.left} solid ${this.marginColor}`
        margin.style.borderRight = `${styles.margin.right} solid ${this.marginColor}`
        margin.style.top = `-${styles.margin.top}`
        margin.style.left = `-${styles.margin.left}`
        this.overlay.style.width = `${rect.width}px`
        this.overlay.style.height = `${rect.height}px`
        this.overlay.style.fontSize = `${fontSize}px`
        this.overlay.style.borderRadius = `${computedStyles.borderRadius}`
    
    } 
}