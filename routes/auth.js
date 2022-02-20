const express = require("express");
const router = express.Router();
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register i.e. Create a new account
router.post("/register", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: cryptoJs.AES.encrypt( req.body.password, process.env.PASS_SEC ).toString(),
  });
  try {
      const savedUser = await newUser.save();
      const { password, ...others } = savedUser._doc;
      res.status(200).json(...others);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        })
        !user && res.status(401).json("Wrong credentials");
    
        const hashedPassword = cryptoJs.AES.decrypt( user.password, process.env.PASS_SEC);
        originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
    
        const inputPassword = req.body.password;
        inputPassword != originalPassword && res.status(401).json("Wrong Credentials");
    
        const accessToken = jwt.sign(
            {id: user._Id, isAdmin: user.isAdmin},
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        )
        const {...others, password} = user._doc;
        res.status(200).json(...others, accessToken);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;
