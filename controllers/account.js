const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// eslint-disable-next-line consistent-return
const createAccount = async (req, res) => {
  try {
    // Get user input
    const {
      firstName, lastName, username, password, confirmPassword,
    } = req.body;
    // Validate user input
    if (!(username && password && confirmPassword && firstName && lastName)) {
      return res.status(400).send('All input is required');
    }

    // Validate Password and Confirm Password
    if (password !== confirmPassword) {
      return res.status(400).send("Password and Confirm Password doesn't match");
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' },
    );

    // save user token
    user.token = token;

    // redirect to Login
    res.redirect('/login');
    // return new user
    // res.status(201).json(user);
  } catch (err) {
    // console.log(err);
  }
};
const validateUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatched) {
      // Create token
      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAccount,
  validateUser,
};
