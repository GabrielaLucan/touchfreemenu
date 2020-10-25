const Category = require('../models/category');

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

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    categories.forEach((x) => {
      x.productCount = 23;
    });

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.move = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    const { categoryId, destinationIndex } = req.body;

    const draggedItem = categories.find((x) => x.id === categoryId);
    const listWithoutItem = categories.filter((x) => x.id !== categoryId).sort((a, b) => a.index - b.index);

    const newList = [...listWithoutItem.slice(0, destinationIndex - 1), draggedItem, ...listWithoutItem.slice(destinationIndex - 1)];

    newList.forEach((x, i) => {
      x.index = i + 1;
    });

    await Promise.all(
      categories.map(async (category) => {
        const newCategoryIndex = newList.find((x) => x.id == category.id).index;

        await Category.updateOne({ _id: category._id }, { $set: { index: newCategoryIndex } });
      })
    );

    res.status(201).json(newList);
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { category } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(category.id, { $set: { name: category.name } }, { new: true });

    res.status(201).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    await Category.findByIdAndRemove(categoryId);

    await uniformizeIndexes();

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const uniformizeIndexes = async () => {
  const categories = (await Category.find({})).sort((a, b) => a.index - b.index);
  const newList = [...categories];
  newList.forEach((x, i) => {
    x.index = i + 1;
  });

  await Promise.all(
    categories.map(async (category) => {
      const newCategoryIndex = newList.find((x) => x.id == category.id).index;

      await Category.updateOne({ _id: category._id }, { $set: { index: newCategoryIndex } });
    })
  );
};
