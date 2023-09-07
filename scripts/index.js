const { runtime, devtools } = browser

let options = {
    appToggle: true,
    opacity: 0.5,
    currentTab: 0,
}

const eles = document.querySelectorAll('body *');

function addLens(element, color) {
   const parent = document.createElement('div')
   parent.classList.add('layoutlens__container')

   const intrinsicDiv = document.createElement('div')
   intrinsicDiv.classList.add('layoutlens__intrinsic')
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
    "DIV": ele => addLens(ele, "#f5ff00"),
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
    const tagName = `${ele.tagName.toLowerCase()}`;

    if (tagName in eleObj) {
        eleObj[ele.tagName.toLowerCase()](ele);
    }

})

runtime.onMessage.addListener(message => options = message || {})