const express = require("express");
const path = require("node:path");

const PORT = 3000;
const links = [
  { href: "/", text: "home" },
  { href: "/about", text: "About" },
];
const users = ["Rose", "Cake", "Biff"];

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get("/", (req, res) => {
  res.locals.animals = ["dog", "cat", "elephant", "cow"];
  res.render("index", { links, users });
});

app.get("/about", (req, res) => {
  res.render("about", { links });
});

app.listen(PORT, () => {
  console.log("Listening at http://127.0.0.1:" + String(PORT));
});
