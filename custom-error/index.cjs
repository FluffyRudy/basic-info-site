const express = require("express");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("./errors.cjs");

const app = express();


app.use('/', asyncHandler(async (req, res, next) => {
    throw new NotFoundError("404 not found..")
}));

app.use((err, req, res, next) => {
    return res.status(404).send(err.message)
})

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
})