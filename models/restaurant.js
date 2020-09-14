const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    email: String,
    logoUrl: String,
    pdfUrl: String,
    joinDate: Date,
    city: String,
    coords: {
      latitude: Number,
      longitude: Number,
    }
  },
  { collation: { locale: 'en', strength: 1 } }
);

restaurantSchema.set('toJSON', { getters: true });
restaurantSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
