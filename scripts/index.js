const { runtime, devtools } = browser

let options = {
    appToggle: true,
    opacity: 0.5,
    currentTab: 0,
}

const eles = document.querySelectorAll('body *');

class LayoutInfo extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({ mode: 'open'})
    }
}

const attachShadow = (tagName, shadowHost, color) => {
    console.log(tagName)
    const slug = `${tagName}-layout-info`
    if (!customElements.get(slug)) customElements.define(slug, LayoutInfo)
}

const highlight = {
    /* Sectioning Root */
    "html": ele => attachShadow("body", ele, "#ff5826"),
    "body": ele => attachShadow("body", ele, "#ff5826"),
    /* Content Sectioning */
    "address": ele => attachShadow("address", ele, "#ff8666"),
    "article": ele => attachShadow("article", ele, "#ffbaa6"),
    "aside": ele => attachShadow("aside", ele, "#ffefe6"),
    "footer": ele => attachShadow("footer", ele, "#fffbeb"),
    "header": ele => attachShadow("header", ele, "#ffffff"),
    "h1": ele => attachShadow("h1", ele, "#ebffeb"),
    "h2": ele => attachShadow("h2", ele, "#c4ffc4"),
    "h3": ele => attachShadow("h3", ele, "#9dff9d"),
    "h4": ele => attachShadow("h4", ele, "#76ff76"),
    "h5": ele => attachShadow("h5", ele, "#4fff4f"),
    "h6": ele => attachShadow("h6", ele, "#29ff29"),
    "hgroup": ele => attachShadow("hgroup", ele, "#00ff00"),
    "main": ele => attachShadow("main", ele, "#23ff00"),
    "nav": ele => attachShadow("nav", ele, "#46ff00"),
    "section": ele => attachShadow("section", ele, "#69ff00"),
    "search": ele => attachShadow("search", ele, "#8cff00"),
    /* Text Content */
    "blockquote": ele => attachShadow("blockquote", ele, "#afff00"),
    "dd": ele => attachShadow("dd", ele, "#d2ff00"),
    "div": ele => attachShadow("div", ele, "#f5ff00"),
    "dl": ele => attachShadow("dl", ele, "#ffff00"),
    "dt": ele => attachShadow("dt", ele, "#ffff3f"),
    "figcaption": ele => attachShadow("figcaption", ele, "#ffff7f"),
    "figure": ele => attachShadow("figure", ele, "#ffffbf"),
    "hr": ele => attachShadow("hr", ele, "#ffffff"),
    "li": ele => attachShadow("li", ele, "#ebffeb"),
    "menu": ele => attachShadow("menu", ele, "#c4ffc4"),
    "ol": ele => attachShadow("ol", ele, "#9dff9d"),
    "p": ele => attachShadow("p", ele, "#76ff76"),
    "pre": ele => attachShadow("pre", ele, "#4fff4f"),
    "ul": ele => attachShadow("ul", ele, "#29ff29"),
    /* Inline Text Semantics */
    "a": ele => attachShadow("a", ele, "#00ff00"),
    "abbr": ele => attachShadow("abbr", ele, "#23ff00"),
    "b": ele => attachShadow("b", ele, "#46ff00"),
    "bdi": ele => attachShadow("bdi", ele, "#69ff00"),
    "bdo": ele => attachShadow("bdo", ele, "#8cff00"),
    "br": ele => attachShadow("br", ele, "#afff00"),
    "cite": ele => attachShadow("cite", ele, "#d2ff00"),
    "code": ele => attachShadow("code", ele, "#f5ff00"),
    "data": ele => attachShadow("data", ele, "#ffff00"),
    "dfn": ele => attachShadow("dfn", ele, "#ffff3f"),
    "em": ele => attachShadow("em", ele, "#ffff7f"),
    "i": ele => attachShadow("i", ele, "#ffffbf"),
    "kbd": ele => attachShadow("kbd", ele, "#ffffff"),
    "mark": ele => attachShadow("mark", ele, "#ebffeb"),
    "q": ele => attachShadow("q", ele, "#c4ffc4"),
    "rp": ele => attachShadow("rp", ele, "#9dff9d"),
    "rt": ele => attachShadow("rt", ele, "#76ff76"),
    "ruby": ele => attachShadow("ruby", ele, "#4fff4f"),
    "s": ele => attachShadow("s", ele, "#29ff29"),
    "samp": ele => attachShadow("samp", ele, "#00ff00"),
    "small": ele => attachShadow("small", ele, "#23ff00"),
    "span": ele => attachShadow("span", ele, "#46ff00"),
    "strong": ele => attachShadow("strong", ele, "#69ff00"),
    "sub": ele => attachShadow("sub", ele, "#8cff00"),
    "sup": ele => attachShadow("sup", ele, "#afff00"),
    "time": ele => attachShadow("time", ele, "#d2ff00"),
    "u": ele => attachShadow("u", ele, "#f5ff00"),
    "var": ele => attachShadow("var", ele, "#ffff00"),
    "wbr": ele => attachShadow("wbr", ele, "#ffff3f"),
    /* Image and multimedia */
    "area": ele => attachShadow("area", ele, "#ffff7f"),
    "audio": ele => attachShadow("audio", ele, "#ffffff"),
    "img": ele => attachShadow("img", ele, "#ebffeb"),
    "map": ele => attachShadow("map", ele, "#c4ffc4"),
    "track": ele => attachShadow("track", ele, "#9dff9d"),
    "video": ele => attachShadow("video", ele, "#76ff76"),
    /* Embedded Content */
    "embed": ele => attachShadow("embed", ele, "#4fff4f"),
    "iframe": ele => attachShadow("iframe", ele, "#29ff29"),
    "object": ele => attachShadow("object", ele, "#00ff00"),
    "picture": ele => attachShadow("picture", ele, "#23ff00"),
    "portal": ele => attachShadow("portal", ele, "#46ff00"),
    "source": ele => attachShadow("source", ele, "#69ff00"),
    /* SVG and MathML */
    "svg": ele => attachShadow("svg", ele, "#8cff00"),
    "math": ele => attachShadow("math", ele, "#afff00"),
    /* Scripting */
    "canvas": ele => attachShadow("canvas", ele, "#d2ff00"),
    "noscript": ele => attachShadow("noscript", ele, "#f5ff00"),
    /* Demarcating edits */
    "del": ele => attachShadow("del", ele, "#ffff00"),
    "ins": ele => attachShadow("ins", ele, "#ffff3f"),
    /* Table Content */
    "caption": ele => attachShadow("caption", ele, "#ffff7f"),
    "col": ele => attachShadow("col", ele, "#ffffff"),
    "colgroup": ele => attachShadow("colgroup", ele, "#ebffeb"),
    "table": ele => attachShadow("table", ele, "#c4ffc4"),
    "tbody": ele => attachShadow("tbody", ele, "#9dff9d"),
    "td": ele => attachShadow("td", ele, "#76ff76"),
    "tfoot": ele => attachShadow("tfoot", ele, "#4fff4f"),
    "th": ele => attachShadow("th", ele, "#29ff29"),
    "thead": ele => attachShadow("thead", ele, "#00ff00"),
    "tr": ele => attachShadow("tr", ele, "#23ff00"),
    /* Forms */
    "button": ele => attachShadow("button", ele, "#46ff00"),
    "datalist": ele => attachShadow("datalist", ele, "#69ff00"),
    "fieldset": ele => attachShadow("fieldset", ele, "#8cff00"),
    "form": ele => attachShadow("form", ele, "#afff00"),
    "input": ele => attachShadow("input", ele, "#d2ff00"),
    "label": ele => attachShadow("label", ele, "#f5ff00"),
    "legend": ele => attachShadow("legend", ele, "#ffff00"),
    "meter": ele => attachShadow("meter", ele, "#ffff3f"),
    "optgroup": ele => attachShadow("optgroup", ele, "#ffff7f"),
    "option": ele => attachShadow("option", ele, "#ffffff"),
    "output": ele => attachShadow("output", ele, "#ebffeb"),
    "progress": ele => attachShadow("progress", ele, "#c4ffc4"),
    "select": ele => attachShadow("select", ele, "#9dff9d"),
    "textarea": ele => attachShadow("textarea", ele, "#76ff76"),
    /* Interactive Elements */
    "details": ele => attachShadow("details", ele, "#4fff4f"),
    "dialog": ele => attachShadow("dialog", ele, "#29ff29"),
    "summary": ele => attachShadow("summary", ele, "#00ff00"),
    /* Web Components */
    "slot": ele => attachShadow("slot", ele, "#23ff00"),
    "template": ele => attachShadow("template", ele, "#46ff00"),
}

eles.forEach(ele => {
    const tagName = ele.tagName.toLowerCase()
    console.log(tagName)
    if (tagName in highlight) {
        highlight[`${tagName}`](ele);
    }
})

runtime.onMessage.addListener(message => options = message || {})