// environment variables and database connection - configs
require('dotenv').config();
require('./config/database').connect();

// setup express
const express = require('express');
const path = require('path');
const auth = require('./middleware/auth');

const app = express();
// import routes
const account = require('./routes/account');

// express configs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API -> Account (register/login)
app.use('/account', account);

// Landing Page
app.get('/', (req, res) => {
  res.render('index');
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login', req.query);
});

// Sign Up Page
app.get('/register', (req, res) => {
  res.render('register');
});

// Sign Up Page
app.get('/dashboard', auth, (req, res) => {
  res.render('dashboard');
});

// 404 Page - get all (*) invalid links that doesn't match other routes
app.get('*', (req, res) => {
  res.render('404');
});

module.exports = app;
