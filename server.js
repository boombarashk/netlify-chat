const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
const hbs = require("hbs")
app.engine("hbs", exphbs({ extname: "hbs" }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/src/views/partials')

const port = "9090"

app.use("/src", express.static(__dirname + '/src'));
["index", "auth", "reg", "404", "500", "settings-base", "settings-password", "settings-avatar"].forEach(filename => {
    const pathname = filename === "index" ? "/" : `/${filename}`

    app.get(pathname, (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', `${filename}.html`))
    })
})

app.get("/hbs/auth", function (req, res) {
    res.render("auth", {title: "Authorization", namePage: 'auth'});
});

app.listen(port)
