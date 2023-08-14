const jwt = require("jsonwebtoken");
const { Shoes } = require("../model/model");
const NodeCache = require("node-cache");
const sharp = require("sharp");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const myCache = new NodeCache({ stdTTL: 10 });

const middlewareController = {
  // verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split("")[1];
      jwt.verify(accessToken, process.env.SECRECT_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },
  validFile: async (req, res, next) => {
    const imageFile = req.file;
    console.log("imageFile");

    if (!imageFile) {
      return res.status(400).json("No image file uploaded.");
    }
    const validImageFormats = ["png", "gif", "jpg"];
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // Check if the image has a valid format
    const imageExtension = path.extname(imageFile.originalname).toLowerCase();
    if (!validImageFormats.includes(imageExtension.substring(1))) {
      fs.unlinkSync(imageFile.path); // Delete the uploaded file
      return res
        .status(400)
        .json("Invalid image format. Allowed formats are png, gif, and jpg.");
    }

 

    // Check capacity (less than 5MB)
    const fileSizeInBytes = imageFile.size;
    if (fileSizeInBytes > 5 * 1024 * 1024) {
      fs.unlinkSync(imageFile.path); // Delete the uploaded file
      return res.status(400).json("File size should be less than 5MB.");
    }

    // Check width (greater than 50px)
    const image = await Jimp.read(imageFile.path);
    const imageWidth = image.bitmap.width;
    if (imageWidth <= 50) {
      fs.unlinkSync(imageFile.path); // Delete the uploaded file
      return res.status(400).json("Image width should be greater than 50px.");
    }

    // Resize the image to width 200px with 80% quality
    const resized200FilePath = `${imageFile.path}-resized200.jpg`;
    await sharp(imageFile.path)
      .resize(200, null)
      .jpeg({ quality: 80 })
      .png({ quality: 80 })
      .gif({ quality: 80 })
      .toFile(resized200FilePath);

    // Resize the image to width 500px with 80% quality
    const resized500FilePath = `${imageFile.path}-resized500.jpg`;
    
    const randomString = uuidv4();
    const imageNameWithRandomString = `./uploads/${imageFile.filename.replace(
      /\..+$/,
      ""
    )}-${randomString}${imageExtension}`;
    
    await sharp(imageFile.path)
      .resize(500, null)
      .jpeg({ quality: 80 })
      .toFile(imageNameWithRandomString);

    // Add watermark to the original image

    const watermarkImage = await Jimp.read("uploads\\watermark.png"); // địa chỉ tới tấm ảnh là water chèn lên những tấm mới khi thêm
    image.composite(watermarkImage, 0.5, 0.5, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5,
    });
   
    // Save the watermarked image
     await image.writeAsync(imageNameWithRandomString);


    req.imageNameWithRandomString = imageNameWithRandomString;
    next();
  },
};

module.exports = middlewareController;
