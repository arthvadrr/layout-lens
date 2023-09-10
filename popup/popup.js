const { browserAction, runtime, tabs } = browser

let options;

const statePromise = new Promise((resolve, reject) => {
    options = JSON.parse(localStorage.getItem('layoutLensState'))
    if (options) {
        console.log(options)
        resolve('Layout lens options found')
    } else {
        options = {
            appToggle: true,
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
    init();
}
const statePromiseOnReject = (reason) => {
    console.log(reason)
    init();
}

statePromise.then(statePromiseOnResolve).catch(statePromiseOnReject);

const init = () => {
    const toggleOption = (e, option) => options[option] = e.target.checked ? true : false

    const sendMessage = () => {
        tabs.query({
            active:true,
            currentWindow: true,
        }).then(tabArr => {
            const currentTab = tabArr[0]
            tabs.sendMessage(currentTab.id, options)
        })
    }

    document.addEventListener("DOMContentLoaded", () => {
        const appToggle = document.getElementById('ll-toggle')

        if (options['appToggle'] === false) {
            appToggle.removeAttribute('checked')
        }

        const opacityLabel = document.getElementById('opacity-label')
        const opacityRange = document.getElementById('ll-opacity')

        appToggle.addEventListener('change', e => {
            toggleOption(e, "appToggle")

            if (e.target.value) {
                browserAction.enable()
            } else {
                browserAction.disable()
            }

            localStorage.setItem('layoutLensState', JSON.stringify(options))
            sendMessage()
        })

        opacityRange.addEventListener('input', e => {
            const val = e.target.value
            options.opacity = e.target.value
            opacityLabel.innerText = `Opacity ${val}`
            sendMessage()
        })
    })
}