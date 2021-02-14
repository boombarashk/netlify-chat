function stopSubmitAndReturnDataFrom(ev) {
    ev.preventDefault()
    const data = {}
    Array.from(this.elements).forEach( element => {
        const tagname = element.tagName.toLowerCase()
        if (tagname === "input" || tagname === "textarea") {
            data[element.name] = element.value
        }
    })
    console.log(data)
    return data
}

function goPage(ev) {
    const page = ev.target.dataset.page
    if (page) {
        document.location.href = `/${page}`
    }
}

window.onload = () => {
    Array.from(document.querySelectorAll(".js-form")).forEach(form => {
        form.addEventListener("submit", stopSubmitAndReturnDataFrom)
    })

    Array.from(document.querySelectorAll(".js-go-page")).forEach(element => {
        element.addEventListener("click", goPage)
    })
}
