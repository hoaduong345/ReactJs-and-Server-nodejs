const shoesController = require("../controller/shoesController");
const categoryController = require("../controller/categoryController")
const upload = require('../config/storage'); 
const middlewareController = require("../controller/middlewareController");
const router = require("express").Router();







// get all shoes
router.get("/getall", shoesController.getAllShoes);

//add
router.post("/add", upload, shoesController.addShoes);

// get a shoes
router.get("/get/:id", shoesController.getAShoes);

// update a shoes
router.put("/update/:id", upload, shoesController.updateAShoes);

// delete a shoes
router.delete("/delete/:id", shoesController.deleteAShoes);
// add category
router.post("/addcategory",categoryController.addCategory)
//get all category
router.get("/getcategory",categoryController.getCategory)
// get all without pagination
router.get("/admin",shoesController.getAllShoesForAdmin)
//search
// router.get("/search",shoesController.search)
module.exports = router;
