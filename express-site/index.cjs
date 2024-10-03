const express = require("express");
const fs = require("fs/promises");
const { join } = require("path");
const { TEMPLATE_PATH } = require('../constants');

const PORT = 3000;

const app = express()

app.get("/", async (req, res) => {
    sendResponse(res, 'index.html', 200);
})

app.get("/about", async (req, res) => {
    sendResponse(res, 'about.html', 200);
})

app.get('/contact', async (req, res) => {
    sendResponse(res, 'contact-me.html', 200);
})

app.get("*", async (req, res) => {
    sendResponse(res, '404.html', 404);
})

app.listen(PORT, () => {
    console.log(`Connected at: http://localhost:${PORT}`);
})

async function readHTML(filepath) {
    try {
        const content = await fs.readFile(filepath, {encoding: 'utf-8'})
        return content;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function sendResponse(response, templateName, statusCode) {
    try {
        let content = await readHTML(join(TEMPLATE_PATH, templateName));
        response.status(statusCode).type('html').send(content);
    } catch(error) {
        response.status(500).send("Internal server error")
    }
    
}