const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.sign_up_post = [
    body("username", "Name must not be empty")
        .trim()
        .isLength({ min: 2 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            username: req.username,
            password: req.password,
        });

        await user.save();
        console.log("Saved!")
    })
]