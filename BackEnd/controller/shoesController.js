const { Shoes } = require("../model/model");
const NodeCache = require("node-cache");
const sharp = require("sharp");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const myCache = new NodeCache({ stdTTL: 10 });

const shoesController = {
  // Search
  search: async (req, res) => {
    const name = req.query.name;
    const products = Shoes.find({
      name: { $regex: new RegExp(name, "i") },
    });
    res.json(products);
  },

  // add shoes
  addShoes: async (req, res) => {
    try {
      const imageFile = req.file;
      console.log("imageFile");

      if (!imageFile) {
        return res.status(400).json("No image file uploaded.");
      }
      const validImageFormats = ["png", "gif", "jpg"];
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
      // Add some characters when image concides
      const name = req.body.name;
      const quantity = req.body.quantity;
      const detail = req.body.detail;
      const category = req.body.category;
      const price = req.body.price;
      const size = req.body.size;
      const color = req.body.color;

      // Basic validation for required fields
      if (
        !name ||
        !quantity ||
        !detail ||
        !category ||
        !price ||
        !size ||
        !color
      ) {
        return res.status(400).json("All fields are required.");
      }

      // Additional validation based on specific requirements
      if (quantity <= 1) {
        return res
          .status(400)
          .json("Quantity must be a positive number and equal than 1");
      }

      if (price <= 1) {
        return res
          .status(400)
          .json("Price must be a positive number and equal than 1");
      }

      const newShoe = {
        name: name,
        quantity: quantity,
        detail: detail,
        category: category,
        price: price,
        image: [imageNameWithRandomString],
        size: size,
        color: color,
      };
      console.log(newShoe);
      await Shoes.insertMany(newShoe);
      res.status(200).json("Upload Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // get All shoes
  getAllShoes: async (req, res) => {
    const page = req.query._page ? parseInt(req.query._page) : 1;
    const perPage = req.query._perPage ? parseInt(req.query._perPage) : 6;
    try {
      const [data, count] = await Promise.all([
        Shoes.find()
          .skip((page - 1) * perPage)
          .limit(perPage),
        Shoes.countDocuments(),
      ]);

      res.status(200).json({
        total: count,
        data: data,
      });
    } catch (error) {
      res.status(500).send(error);
      console.log("erro", error);
    }
  },

  // get all shoes for admin
  getAllShoesForAdmin: async (req, res) => {
    try {
      const data = await Shoes.find();
      const count = await Shoes.countDocuments();

      res.status(200).json({
        total: count,
        data: data,
      });
    } catch (error) {
      res.status(500).send(error);
      console.log("error", error);
    }
  },

  // get a shoes
  getAShoes: async (req, res) => {
    const data = myCache.get("details:" + req.params.id);
    if (data) {
      console.log("data from cache");
      res.status(200).send(data);
    } else {
      console.log("data from DB");
      try {
        const shoes = await Shoes.findById(req.params.id);
        myCache.set("details:" + req.params.id, JSON.stringify(shoes));
        res.status(200).send(JSON.stringify(shoes));
      } catch (error) {
        res.status(500).json(error);
        console.log("erro", error);
      }
    }
  },

  // update a shoes
  updateAShoes: async (req, res) => {
    try {
      const imageFile = req.file;
      console.log("imageFile");

      if (!imageFile) {
        return res.status(400).json("No image file uploaded.");
      }
      const validImageFormats = ["png", "gif", "jpg"];
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

      const name = req.body.name;
      const quantity = req.body.quantity;
      const detail = req.body.detail;
      const category = req.body.category;
      const price = req.body.price;
      const size = req.body.size;
      const color = req.body.color;

      // Basic validation for required fields
      if (
        !name ||
        !quantity ||
        !detail ||
        !category ||
        !price ||
        !size ||
        !color
      ) {
        return res.status(400).json("All fields are required.");
      }

      // Additional validation based on specific requirements
      if (quantity <= 1) {
        return res
          .status(400)
          .json("Quantity must be a positive number and equal than 1");
      }

      if (price <= 1) {
        return res
          .status(400)
          .json("Price must be a positive number and equal than 1");
      }

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

      const updateShoe = {
        name: name,
        quantity: quantity,
        detail: detail,
        category: category,
        price: price,
        image: [imageNameWithRandomString],
        size: size,
        color: color,
      };

      console.log("before", updateShoe);
      const shoe = await Shoes.findByIdAndUpdate(
        req.params.id,
        { $set: updateShoe },
        { new: true }
      );
      console.log("after", shoe);

      res.status(200).send(JSON.stringify("Update Successfully"));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete a shoes
  deleteAShoes: async (req, res) => {
    try {
      await Shoes.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = shoesController;
