const { Router } = require("express");

const homeRoute = Router();

homeRoute.get('/', (req, res) => {
    console.log(req.ip)
    console.log(res.locals)
    res.send("Root path");
});

homeRoute.get("/message.from.naruto", (req, res) => {
    res.send("Hokage dattebayo");
})

module.exports = { homeRoute };