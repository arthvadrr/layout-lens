import defaultOptions from '../options'

const { tabs } = browser

let options;

const statePromise = new Promise((resolve, reject) => {
    options = JSON.parse(localStorage.getItem('layoutLensState'))
    if (options) {
        resolve('Layout lens options found in popup')
    } else {
        options = defaultOptions
        localStorage.setItem('layoutLensState', JSON.stringify(options))
        reject('Layout lens options set')
    }
})

const statePromiseOnResolve = (res) => {
    console.log(res)
    init();
}
const statePromiseOnReject = (reason) => {
    console.log(reason)
    init();
}

statePromise.then(statePromiseOnResolve).catch(statePromiseOnReject);

const init = () => {
    const toggleOption  = (e, option) => options[option] = e.target.checked ? true : false
    const toggleTagname = (e, tagname) => options.tagnames[tagname] = e.target.checked ? true : false

    
    const toggleAllTagNames = (e, toggle) => {
        e.preventDefault()
        const eles = document.querySelectorAll('.kera')

        eles.forEach(ele => {
            if (toggle) {
                ele.setAttribute('checked', 'true')
            } else {
                ele.removeAttribute('checked')
            }
            options.tagnames[ele.getAttribute('data-tagname')] = toggle
        })
        console.log(options.tagnames)
        sendMessage()
    }

    const sendMessage = () => {
        tabs.query({
            active:true,
            currentWindow: true,
        }).then(tabArr => {
            const currentTab = tabArr[0]
            localStorage.setItem('layoutLensState', JSON.stringify(options))
            tabs.sendMessage(currentTab.id, options)
        })
    }

    document.addEventListener("DOMContentLoaded", () => {
        const elementSelection = document.querySelector('.element-selection')
        const $button_setAllTagNames = document.getElementById('set-tagNames')
        const $button_unsetAllTagNames = document.getElementById('unset-tagNames')

        for (const tagname in options.tagnames) {
            const inputGroup = document.createElement('div')
            const input = document.createElement('input')
            const label = document.createElement('label')

            input.classList.add('kera')
            input.setAttribute('type', 'checkbox')
            input.setAttribute('id', `element-selection-${tagname}`)
            input.setAttribute('data-tagname', tagname)
            if (options.tagnames[tagname]) input.setAttribute('checked', 'true')
            label.setAttribute('for', `element-selection-${tagname}`)
            label.setAttribute('name', `element-selection-${tagname}`)
            label.innerText = `${tagname.toLowerCase()}`

            input.addEventListener('change', e => {
                toggleTagname(e, tagname)
                sendMessage()
            })

            inputGroup.appendChild(input)
            inputGroup.appendChild(label)
            elementSelection.appendChild(inputGroup)
        }

        const appToggle = document.getElementById('ll-toggle')

        if (options['appToggle'] === false) {
            appToggle.removeAttribute('checked')
        }

        const opacityLabel = document.getElementById('opacity-label')
        const opacityRange = document.getElementById('ll-opacity')

        opacityRange.value = options.opacity
        opacityLabel.innerText = `Opacity ${options.opacity}`

        appToggle.addEventListener('change', e => {
            toggleOption(e, "appToggle")
            sendMessage()
        })

        opacityRange.addEventListener('input', e => {
            const val = e.target.value
            options.opacity = e.target.value
            opacityLabel.innerText = `Opacity ${val}`
            sendMessage()
        })

        $button_setAllTagNames.addEventListener('click', e => {
            toggleAllTagNames(e, true)
        })
        $button_unsetAllTagNames.addEventListener('click', e => {
            toggleAllTagNames(e, false)
        })
    })
}