class Overlay {
    constructor(ele, marginColor, paddingColor) {
        this.ele = ele
        this.marginColor = marginColor
        this.paddingColor = paddingColor
    }
    
    overlay = document.createElement('div')
    margin = document.createElement('div')
    padding = document.createElement('div')
    infoOverlay = document.createElement('div')

    updateOverlayPosition() {
        const { scrollY, scrollX } = window
        const rect = this.ele.getBoundingClientRect()
        this.overlay.style.top = `${rect.top + scrollY}px`
        this.overlay.style.left = `${rect.left + scrollX}px`
    }

    createOverlayStyles() {
        const computedStyles = window.getComputedStyle(this.ele)
        const rect = this.ele.getBoundingClientRect()
        let fontSize = rect.height * 0.30;

        this.infoOverlay.classList.add('layoutlens__info-overlay')
        this.infoOverlay.innerText = `${this.ele.tagName}`
    
        this.overlay.appendChild(this.infoOverlay)
    
        const styles = {
            paddingStyles: {
                top: computedStyles.paddingTop,
                bottom: computedStyles.paddingBottom,
                left: computedStyles.paddingLeft,
                right: computedStyles.paddingRight,
            },
            marginStyles: {
                top: computedStyles.marginTop,
                bottom: computedStyles.marginBottom,
                left: computedStyles.marginLeft,
                right: computedStyles.marginRight,
            }
        }
    
        this.padding.style.borderBottom = `${styles.paddingStyles.bottom} solid ${this.paddingColor}`
        this.padding.style.borderTop = `${styles.paddingStyles.top} solid ${this.paddingColor}`
        this.padding.style.borderLeft = `${styles.paddingStyles.left} solid ${this.paddingColor}`
        this.padding.style.borderRight = `${styles.paddingStyles.right} solid ${this.paddingColor}`
        this.padding.style.borderRadius = `${computedStyles.borderRadius}`
        this.margin.style.borderBottom = `${styles.marginStyles.bottom} solid ${this.marginColor}`
        this.margin.style.borderTop = `${styles.marginStyles.top} solid ${this.marginColor}`
        this.margin.style.borderLeft = `${styles.marginStyles.left} solid ${this.marginColor}`
        this.margin.style.borderRight = `${styles.marginStyles.right} solid ${this.marginColor}`
        this.margin.style.top = `-${styles.marginStyles.top}`
        this.margin.style.left = `-${styles.marginStyles.left}`
        this.overlay.style.width = `${rect.width}px`
        this.overlay.style.height = `${rect.height}px`
        this.overlay.style.fontSize = `${fontSize}px`
        this.overlay.style.borderRadius = `${computedStyles.borderRadius}`
    }

    createOverlay() {
        let str = ''
        this.ele.classList.forEach(classname => str += `${classname} `)
        
        if (this.ele.id) this.overlay.setAttribute('data-id', this.ele.id)
        if (str) this.overlay.setAttribute('data-class', str)
        
        this.overlay.setAttribute('aria-hidden', 'true')  
        this.overlay.classList.add('layoutlens__overlay')
        this.margin.classList.add('layoutlens__margin')
        this.padding.classList.add('layoutlens__padding')
        this.overlay.appendChild(this.margin)
        this.overlay.appendChild(this.padding)
        this.updateOverlayPosition()
        this.createOverlayStyles()
        
        return this.overlay
    }
}

export default Overlay