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
      return res.redirect('/register?status=failed');
    }

    // Validate Password and Confirm Password
    if (password !== confirmPassword) {
      return res.redirect('/register?match=true');
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.redirect('/register?exist=true');
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
    res.redirect('/login?status=created');
  } catch (err) {
    console.log(err);
  }
};
// eslint-disable-next-line consistent-return
const validateUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res.redirect('/login?status=failed');
    }

    // Validate if user exist in our database
    const user = await User.findOne({ username });

    // Validate Password if user is found
    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (isPasswordMatched) {
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

        // set cookies
        res.cookie('token', token, {
          maxAge: 2 * 60 * 60 * 1000, // 2hrs
          secure: true,
          samesite: true,
        });

        // eslint-disable-next-line no-underscore-dangle
        res.cookie('id', user._id, {
          maxAge: 2 * 60 * 60 * 1000, // 2hrs
          secure: true,
          samesite: true,
        });

        // redirect it to dashboard with the set cookies
        return res.redirect('/dashboard');
      }
    }

    res.redirect('/login?status=failed');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAccount,
  validateUser,
};
