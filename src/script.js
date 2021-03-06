function stopSubmitAndReturnDataFrom(ev) {
    ev.preventDefault()
    const data = {}
    Array.from(this.elements).forEach( element => {
        const tagname = element.tagName.toLowerCase()
        if (tagname === "input" || tagname === "textarea") {
            data[element.name] = element.value
        }
    })
    return data
}

function goPage(ev) {
    const page = ev.target.dataset.page
    if (page) {
        document.location.href = `/${page}`
    }
}

let rootNode
document.addEventListener('DOMContentLoaded', function(){
    rootNode = document.querySelector(".root");
})

const fetchTemplate = ({name, url}) => {
    return fetch(url).then(function (response) {
        return response.text();
    }).then(function (html) {
        return {[name]: html};
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

const registerBlocks = (blocks) => {
    let templates = {}
    const promises = blocks.map((opts) => {
        return fetchTemplate(opts)
    })
    return Promise.all(promises).then( result => {
        result.forEach(template => {
            templates = Object.assign({...templates, ...template})
        })
        return templates
    })
}

window.initApp = () => {
    return new Promise((resolve) => {
        const intervalLoading = setInterval(() =>{
            if (rootNode) {
                clearInterval(intervalLoading)
                resolve({rootNode, registerBlocks})
            }
        }, 300)
    })
}

window.onload = () => {
    Array.from(document.querySelectorAll(".js-form")).forEach(form => {
        form.addEventListener("submit", stopSubmitAndReturnDataFrom)
    })

    Array.from(document.querySelectorAll(".js-go-page")).forEach(element => {
        element.addEventListener("click", goPage)
    })
}
