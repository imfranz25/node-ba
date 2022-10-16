const Hotel = require('../models/hotel');

const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.render('dashboard', { hotels });
};

const addHotel = async (req, res) => {
  const {
    hotelName,
    uploader,
    description,
    address,
    image,
  } = req.body;

  console.log(req.body);

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
};
