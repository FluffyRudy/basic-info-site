const { createServer } = require("http");
const { listPages } = require("./fileHandler.cjs");
const { readFile } = require("fs/promises");

const socket = { hostname: "127.0.0.1", port: "5173" };

const server = createServer(async (request, response) => {
  console.log(request.url);
  const pages = await listPages("pages");
  const page =
    pages.pages[
      request.url === "/" || request.url === "/404" ? "/index" : request.url
    ];
  let content = await readFile(pages.pages["/404"]);
  try {
    if (!page) throw new Error("Invalid page");
    content = await readFile(page);
  } catch (error) {
    console.log(error.message);
  }
  console.log(request.url);
  response.writeHead(page ? 200 : 400, {
    "Content-Type": "text/html",
  });
  response.write(content);
  response.end();
});

server.listen(socket.port, socket.hostname, () => {
  console.log("Connected at: " + `http://${socket.hostname}:${socket.port}`);
});
