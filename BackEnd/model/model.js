const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    ref: "Category",
  },
  detail: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  image: {
    type: Array,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expries: 3600,
  },
});
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      minlenght: 3,
      maxlenght: 30,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      minlenght: 3,
      maxlenght: 30,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const categorySchema = new mongoose.Schema({
  namecategory: {
    type: String,
    require: true,
  },
});
let Shoes = mongoose.model("Shoes", shoeSchema);
let User = mongoose.model("User", userSchema);
let Category = mongoose.model("Category", categorySchema);
module.exports = { Shoes, User, Category };
