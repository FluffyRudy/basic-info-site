const http = require("node:http");
const fileSys = require("fs/promises");
const { join } = require("path");
const { TEMPLATE_PATH } = require("../constants");
 
const HOST = '127.0.0.1';
const PORT = 8000;

const server = http.createServer(async (request, response) => {
    const urlPath = request.url;
    const content = await route(urlPath);

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(content);
})

server.listen(PORT, HOST, () => {
    console.log(`Listening server at: http://${HOST}:${PORT}`);
})

server.on('error', (error) => {
    console.error("error occured", error.message);
})

async function readHTML(path) {
    try {
        const content = await fileSys.readFile(path, {encoding: 'utf-8'});
        return content;
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
    return null;
}

async function route(urlpath) {
    let filename = "404.html"
    
    switch(urlpath) {
        case '/':
            filename = 'index.html';
            break;
        case '/about':
            filename = 'about.html';
            break;
        case '/contact':
            filename = 'contact-me.html';
            break;
    }

    const templatePath = join(TEMPLATE_PATH, filename);
    return  await readHTML(templatePath)
}

