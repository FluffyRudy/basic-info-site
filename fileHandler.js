const { resolve } = require("node:path");
const { access, readFile, readdir } = require("node:fs/promises");
const { basename, extname } = require("node:path");

async function listPages(dirname) {
  const htmlFilesDir = resolve(__dirname, dirname);
  const pages = { filesDir: htmlFilesDir, pages: {} };
  const getExtOmmittedFile = (filename) =>
    basename(filename, extname(filename));
  try {
    const files = await readdir(htmlFilesDir);
    files.forEach(
      (file) =>
        (pages.pages[`/${getExtOmmittedFile(file)}`] = resolve(
          __dirname,
          dirname,
          file
        ))
    );
    return pages;
  } catch (error) {
    console.log(error);
  }
  return pages;
}

module.exports = { listPages };
