const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAI_SUPPORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent Successfully");
    next();
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
module.exports = SendEmail;
