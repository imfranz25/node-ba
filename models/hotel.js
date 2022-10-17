const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotel_name: { type: String, default: null },
  uploader: { type: String, default: null },
  description: { type: String, default: null },
  address: { type: String, default: null },
  image: { type: String, default: null },
  reviews: { type: String, default: null },
  date_posted: { type: Date, default: new Date() },
});

module.exports = mongoose.model('hotel', hotelSchema);
