const express = require("express");
const router = express.Router();

const { Register,Login,getUser} = require("../controllers/auth");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/getUser").post(getUser);

module.exports = router;