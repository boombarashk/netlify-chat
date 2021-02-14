const express = require('express')
const path = require('path')
const app = express()
const port = "9090"

app.use("/src", express.static(__dirname + '/src'));
["index", "auth", "reg", "404", "500", "settings-base", "settings-password", "settings-avatar"].forEach(filename => {
    const pathname = filename === "index" ? "/" : `/${filename}`

    app.get(pathname, (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', `${filename}.html`))
    })
})

app.listen(port)
