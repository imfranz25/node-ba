const Hotel = require('../models/hotel');
const getcookie = require('./getcookie');

const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.render('dashboard', { hotels });
};

const addHotelForm = async (req, res) => {
  res.render('add-hotel');
};

const addHotel = async (req, res) => {
  const uploader = getcookie(req).username;

  const {
    hotelName,
    description,
    address,
    image,
  } = req.body;

  // eslint-disable-next-line no-unused-vars
  const newHotel = await Hotel.create({
    hotel_name: hotelName,
    uploader,
    description,
    address,
    image,
  });

  res.redirect('/dashboard');
};

module.exports = {
  addHotel,
  getHotels,
  addHotelForm,
};
