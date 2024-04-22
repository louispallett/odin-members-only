const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController")

router.post("/api/users/sign-up", userController.sign_up_post);