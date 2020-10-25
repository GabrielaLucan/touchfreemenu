const Category = require('../models/category');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    categories.forEach(x => {
      x.productCount = 23;
    })

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name.trim().length) {
      return res.status(422).json({ message: 'Cannot create category with no name.' });
    }

    const highestCategoryIndex = (await Category.findOne().sort({ index: -1 }))?.index || -1;

    const category = await Category.create({ name, index: highestCategoryIndex + 1 });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
