const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ShoeRouter = require("./routes/Shoes"); 
const UserRouter = require("./routes/Auth")
var path = require('path')
// CONNECT DATABASE
dotenv.config();



var option = {};
mongoose.connect(process.env.MONGODB_URL, option).then(
  () => {
    console.log("Connected to MongoDB");
  },
  (Error) => {
    console.log("Connect To MongoDB Failed", Error);
  }
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("common"));

app.use(path.join(__dirname, ""), express.static(path.join(__dirname, "")))

app.use(express.static(path.join(__dirname, "")));

// app.use(express.static('./src/public'));
// ROUTER
app.use("/v1/shoes", ShoeRouter);
app.use("/v1/auth", UserRouter)
app.use(bodyParser.json());
app.listen(8000, () => {
  console.log("server is running");
});
