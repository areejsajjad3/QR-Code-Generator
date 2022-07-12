const express = require("express");
const app = express();
const path = require("path");
const qrcode = require("qrcode");
const ejs = require("ejs");
const port = process.env.port || 9010;

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    res.status(201).render('index', { title: "QR CODE GENERATOR" });
})

app.post("/scan", (req, res, next) => {
    const input_text = req.body.text;
    qrcode.toDataURL(input_text, (err, src) => {
        if (err) res.send("Something went wrong!!");
        res.render('scan', {
            title: "QR Code",
            qrcode: src
        });
    })
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});