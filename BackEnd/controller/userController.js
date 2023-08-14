const { User } = require("../model/model");
const { Token } = require("../model/token");
const SendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { validate } = require("email-validator");
dotenv.config();

const userController = {
  // GENERATE ACCESS TOKEN
  genereateAccessToken: (email) => {
    return jwt.sign(
      {
        id: email.id,
      },
      process.env.SECRECT_KEY,
      { expiresIn: "1h" }
    );
  },
  // GENERATE REFRESH TOKEN
  genereateRefreshToken: (email) => {
    return jwt.sign(
      {
        id: email.id,
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },
  // createToken: (_id) => {
  //  const jwtSecrectKey = process.env.SECRECT_KEY;
  //  return jwt.sign({_id},jwtSecrectKey,{expiresIn:"3d"})
  // },

  // REGISTER

  addUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      if (!req.body.password || !salt) {
        throw new Error("Missing password or salt");
      }

      const hashed = await bcrypt.hash(req.body.password, salt);

      // Validate email format
      if (!validate(req.body.email)) {
        throw new Error("Invalid email format");
      }

      // Validate email length
      if (req.body.email.length < 12 || req.body.email.length > 50) {
        throw new Error("Email length must be between 12 and 50 characters");
      }

      // Validate password length
      if (req.body.password.length < 6 || req.body.password.length > 12) {
        throw new Error("Password length must be between 6 and 12 characters");
      }
      // Check the email is already used.      
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        throw new Error("Email is already registered");
      }
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashed,
      };
      let user = await User.insertMany(newUser);
      const token = await new Token({
        userId: user[0]._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}/auth/${user[0]._id}/verify/${token.token}`;
      await SendEmail(user[0].email, "Verify email", url);

      res.status(200).json("An email send to your email, please verify ");
    } catch (error) {
      res.status(500).json(error.message);
      console.log(error);
    }
  },
  // FORGOT PASSWORD
  // forgotPassword : async(req,res) =>{
  //   const email = req.body
  //   try {
  //     const oldUser = await User.findOne({email});
  //     if(!oldUser){
  //       return res.send("User not exist")
  //     }
      
  //   } catch (error) {
      
  //   }
  // },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const email = await User.findOne({ email: req.body.email });
      console.log(req.body.email);
      console.log("password", req.body.password);

      if (!email) {
        return res.status(404).json("wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        email.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      if (!email.verified) {
        let token = await Token.findOne({ userId: email._id });
        if (!token) {
          token = await new Token({
            userId: email._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}user/${email._id}/verify/${token.token}`;
          await SendEmail(email.email, "Verify email", url);
        }
        return res.status(400).send({
          message: "An email has sent to your email, please check that",
        });
      }
      if (email && validPassword) {
        const accessToken = userController.genereateAccessToken(email);
        const refreshToken = userController.genereateRefreshToken(email);
        res.cookie("refreshToken", refreshToken, {
          httpOnlyCookie: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = email._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, email) => {
      if (err) {
        console.log(err);
      }
      // create new access token, refresh token
      const newAccesstoken = userController.genereateAccessToken(email);
      const newRefrestoken = userController.genereateRefreshToken(email);
    });
    res.status(200).json({ accessToken: newAccesstoken });
  },

  // send mail from gmail account

  verify: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "invalid link" });
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      await User.updateOne({ _id: user._id, verified: true });
      await token.remove();
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
