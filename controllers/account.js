const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("./../models/user"); 

const createAccount = async (req, res) => {

  try {
    // Get user input
    const { first_name, last_name, username, password, confirm_password } = req.body;
    // Validate user input
    if (!(username && password && confirm_password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // Validate Password and Confirm Password
    if (password != confirm_password) {
      return res.status(400).send("Password and Confirm Password doesn't match");
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      { expiresIn: "2h", }
    );

    // save user token
    user.token = token;

    // redirect to Login
    res.redirect("/login")
    // return new user
    // res.status(201).json(user);

  } catch (err) {
    console.log(err);
  }
}


module.exports = {
 createAccount,
}