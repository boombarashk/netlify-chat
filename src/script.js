function stopSubmitAndReturnDataFrom(ev) {
    ev.preventDefault();
    const data = {}
    Array.from(this.elements).forEach( element => {
        if (element.tagName.toLowerCase() === "input") {
            data[element.name] = element.value
        }
    })
    console.log(data)
    return data
}

window.onload = () => {
    Array.from(document.querySelectorAll(".js-form")).forEach(form => {
        form.addEventListener("submit", stopSubmitAndReturnDataFrom)
    })
}
