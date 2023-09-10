const { browserAction, runtime, tabs } = browser

const options = {
    appToggle: true,
    opacity: 0.5,
    currentTab: 0,
}

const toggleOption = (e, option) => options[option] = e.target.checked ? true : false

const response = () => console.log('yay')
const err = err => console.log(err)

const sendMessage = () => {
    console.log('sending...')
    tabs.query({
        active:true,
        currentWindow: true,
    }).then(tabArr => {
        console.log('thening...')
        const currentTab = tabArr[0]
        tabs.sendMessage(currentTab.id, options)
    })
}

runtime.onMessage.addListener(message => {
    console.log(message)
})

document.addEventListener("DOMContentLoaded", () => {
    const appToggle = document.getElementById('ll-toggle')
    const opacityLabel = document.getElementById('opacity-label')
    const opacityRange = document.getElementById('ll-opacity')

    appToggle.addEventListener('change', e => {
        toggleOption(e, "appToggle")

        if (e.target.value) {
            browserAction.enable()
        } else {
            browserAction.disable()
        }

        sendMessage()
    })

    opacityRange.addEventListener('input', e => {
        const val = e.target.value
        options.opacity = e.target.value
        opacityLabel.innerText = `Opacity ${val}`
        sendMessage()
    })
})