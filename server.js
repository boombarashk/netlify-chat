const express = require('express');
const path = require('path')
const app = express()
const port = "9090"

app.use("/src", express.static(__dirname + '/src'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port)
