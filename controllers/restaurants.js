const Restaurant = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = req.body;

    const createdRestaurant = await Restaurant.create({ ...restaurant, joinDate: new Date() });

    res.status(201).json({ ...createdRestaurant });
  } catch (err) {
    next(err);
  }
};

exports.goToMenu = async (req, res, next) => {
  try {
    const { restaurantSlug } = req.params;

    const restaurant = await Restaurant.findOne({ slug: restaurantSlug });

    if (restaurant) {
      return res.redirect(restaurant.pdfUrl);
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};

exports.uploadPdfMenu = async (req, res, next) => {
  try {
    const { restaurantSlug } = req.params;

    const restaurant = await Restaurant.findOne({ slug: restaurantSlug });

    if (restaurant) {
      return res.redirect(restaurant.pdfUrl);
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};
