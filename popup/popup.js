const { browserAction } = browser;

document.addEventListener("DOMContentLoaded", () => {
    const opacityLabel = document.getElementById('opacity-label');
    const opacityRange = document.getElementById('ll-opacity');

    opacityRange.addEventListener('input', e => {
        const val = e.target.value;
        opacityLabel.innerText = `Opacity ${val}`
    })

    document.getElementById("menu-item-1").addEventListener("click", () => {
        browserAction.setTitle({ title: "Layout Lens"});
    });
    
    document.getElementById("menu-item-2").addEventListener("click", () => {
        console.log("item 2 clicked")
    });
});