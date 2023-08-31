const { runtime } = browser

let options = {
    appToggle: true,
    opacity: 0.5,
    currentTab: 0,
}

runtime.onMessage.addListener(message => options = message || {})
