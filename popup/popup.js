document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("menu-item-1").addEventListener("click", () => {
        console.log("item 1 clicked");
        alert('hi')
    });
    
    document.getElementById("menu-item-2").addEventListener("click", () => {
        console.log("item 2 clicked")
    });
});