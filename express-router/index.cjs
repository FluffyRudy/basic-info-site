const express = require("express");
const { homeRoute } = require("./routes/home.cjs")

const app = express();

const port = 3000;

app.use((req, res, next) => {
    console.log("middleware");
    res.locals.customData = { "test": "data" }
    next()
})

app.use('/', homeRoute);

app.listen(port, () => {
    console.log(`Listening at: http://127.0.0.1:${port}`);
})
