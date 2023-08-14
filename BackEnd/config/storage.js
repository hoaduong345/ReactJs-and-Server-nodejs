const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");
const Jimp = require("jimp");
// const iconv = require("iconv-lite");

const storage = multer.diskStorage({
  destination: (req, file, res) => {
    const folder = "./uploads";

    createFolder(folder);
    res(null, folder);
  },
  filename: (req, file, res) => {
    console.log(file);
    res(null, file.originalname);
  },
});

// create a new folder if the item doesn't exist
function createFolder(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

const upload = multer({ storage: storage });
module.exports = upload.single("file");
