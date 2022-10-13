const mongoose = require("mongoose");
const User = require("../model/user"); 

const createAccount = async (req, res) => {

  try {
    // Get user input
    const { firstName, lastName, userEmail, userPassword } = req.body;

    // Validate user input
    if (!(userEmail && userPassword && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ userEmail });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(userPassword, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: userEmail.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, userEmail },
      process.env.TOKEN_KEY,
      { expiresIn: "2h", }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);

  } catch (err) {
    console.log(err);
  }
}


module.exports = {
 createAccount,
}