const userController = require("../controller/userController");
const sendEmail = require("../utils/sendEmail")
// const ChatController = require("../controller/chatController");
const router = require("express").Router();


//resgister
router.post("/signin",userController.addUser);
// login
router.post("/login",userController.loginUser)
// forgot password
// router.post("/send_recovery_email", userController.send_recovery_email)
// router.post("/verify-email",userController.veryfiEmail)

// refresh token
router.post("/refresh",userController.requestRefreshToken)
router.post("/sendemail", sendEmail)
// VERIFI EMAIL
router.get("/:id/verify/:token", userController.verify)

// router.post("/chat",ChatController.authenticate)

module.exports = router;