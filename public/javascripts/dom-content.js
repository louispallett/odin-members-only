document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const counter = document.getElementById("counter");
    const maxLength = content.getAttribute("maxLength");

    counter.innerHTML = "0/" + maxLength;
    content.addEventListener("input", (e) => {
        const target = e.target;
        const currentLength = target.value.length;
        counter.innerHTML = currentLength + "/" + maxLength;
    });
})