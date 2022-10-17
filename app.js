// environment variables and database connection - configs
require('dotenv').config();

// setup express
const express = require('express');
const path = require('path');

const app = express();

// Middlewares
const verifyToken = require('./middleware/auth');
const deleteCookie = require('./middleware/delete-cookie');

// import routes
const account = require('./routes/account');
const hotel = require('./routes/hotel');
const { getHotels } = require('./controllers/hotel');

// express configs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API -> Account (register/login)
app.use('/account', account);
app.use('/hotel', hotel);

// Landing Page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Login Page
app.get('/login', (req, res) => {
  const { status } = req.query;
  res.render('login', { title: 'Home', status });
});

// Sign Up Page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Dashboard Page -> Hotel List
app.get('/dashboard', verifyToken, getHotels);

// Logout
app.get('/logout', deleteCookie, (req, res) => {
  res.redirect('login');
});

// 404 Page - get all (*) invalid links that doesn't match other routes
app.get('*', (req, res) => {
  res.render('404', { title: '404 Page not Found' });
});

module.exports = app;
