const Product = require('../models/product');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY });

exports.uploadImageToS3 = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_PRODUCT_IMAGES,
    fileFilter: function (_req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    },
    key: (req, file, cb) => {
      const imageKey = `${req.user.username}/${+new Date()}-${file.originalname}`;

      req.uploadedImageKey = imageKey;

      cb(null, imageKey);
    },
  }),
}).single('imageFile');

exports.create = async (req, res, next) => {
  try {
    const { name, ingredients, quantities, price, discountedPrice, categoryId, isDiscounted } = req.body;

    let imageUrl = '';
    let imageKey = '';

    if (req.file) {
      imageUrl = req.file.location;
      imageKey = req.uploadedPdfKey;
    }

    const highestProductIndex = (await Product.findOne().sort({ index: -1 }))?.index || 0;

    const product = await Product.create({
      name,
      imageUrl,
      imageKey,
      ingredients,
      quantities,
      price,
      isDiscounted,
      discountedPrice,
      category: '5f9743882484ae1d58a5a15f',
      index: highestProductIndex + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find({});

    products.forEach((x) => {
      x.productCount = 23;
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.move = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const { productId, destinationIndex } = req.body;

    const draggedItem = products.find((x) => x.id === productId);
    const listWithoutItem = products.filter((x) => x.id !== productId).sort((a, b) => a.index - b.index);

    const newList = [...listWithoutItem.slice(0, destinationIndex - 1), draggedItem, ...listWithoutItem.slice(destinationIndex - 1)];

    newList.forEach((x, i) => {
      x.index = i + 1;
    });

    await Promise.all(
      products.map(async (product) => {
        const newProductIndex = newList.find((x) => x.id == product.id).index;

        await Product.updateOne({ _id: product._id }, { $set: { index: newProductIndex } });
      })
    );

    res.status(201).json(newList);
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { product } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(product.id, { $set: { name: product.name } }, { new: true });

    res.status(201).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await Product.findByIdAndRemove(productId);

    await uniformizeIndexes();

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const uniformizeIndexes = async () => {
  const products = (await Product.find({})).sort((a, b) => a.index - b.index);
  const newList = [...products];
  newList.forEach((x, i) => {
    x.index = i + 1;
  });

  await Promise.all(
    products.map(async (product) => {
      const newProductIndex = newList.find((x) => x.id == product.id).index;

      await Product.updateOne({ _id: product._id }, { $set: { index: newProductIndex } });
    })
  );
};
