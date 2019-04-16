var express = require("express");
var router = express.Router();
var user_md = require("../models/user")
var helper = require("../helpers/helper");

router.get("/", function (req, res) {
    res.json({
        "message": "This is Admin page"
    });
});

router.get("/signup", function (req, res) {
    res.render("signup", { data: {} });
});

router.post("/signup", function (req, res) {
    var user = req.body;

    if (user.email.trim().length == 0) {
        res.render("signup", { data: { error: "Email is required!" } });
    }

    if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
        res.render("signup", { data: { error: "Password is not match!" } })
    }

    // hash password
    var password = helper.hash_password(user.passwd);
    // Insert to database
    user = {
        email: user.email,
        password: password,
        first_name: user.firstname,
        last_name: user.lastname
    }

    var result = user_md.addUser(user);

    // result
    result.then(function (data) {
        res.json({ message: "Insert success" });
    }).catch(function (error) {
        res.render("signup", { data: { error: "error" } });
    })
});

module.exports = router;