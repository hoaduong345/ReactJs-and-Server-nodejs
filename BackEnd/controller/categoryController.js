const {Category} = require("../model/model")

const CategoryController = {
    addCategory: async(req,res) =>{
        console.log("1")
        try {
            console.log("2222",req.body.namecategory)
            const newCategories = {
                namecategory: req.body.namecategory
            }
            await Category.insertMany(newCategories);
            res.status(200).json("Add category successfully")
        } catch (error) {
            console.log("3",error)
            res.status(500).json(error);
           
        }
    },
    getCategory: async(req,res) => {
        try {
            const categories = await Category.find(); // Fetch all categories from the database
            res.status(200).json(categories); // Return the list of categories as a JSON response
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error fetching categories" });
          }
    }
}
module.exports = CategoryController