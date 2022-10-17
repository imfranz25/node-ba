const Hotel = require('../models/hotel');
const getcookie = require('./getcookie');

const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.render('dashboard', { title: 'Dashboard', hotels });
};

const addHotelForm = async (req, res) => {
  res.render('add-hotel', { title: 'Add Hotel' });
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

const deleteHotel = async (req, res) => {
  const { hotelID } = req.body;
  await Hotel.findByIdAndDelete(hotelID);
  res.status(202).json({ msg: 'Record Delete Successfully' });
};

const viewHotel = async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  console.log(hotel);
  res.render('view-hotel');
};

module.exports = {
  addHotel,
  getHotels,
  addHotelForm,
  deleteHotel,
  viewHotel,
};
