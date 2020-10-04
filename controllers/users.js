const { body, validationResult } = require('express-validator/check');
const { login, createAuthToken } = require('../services/auth');
const User = require('../models/user');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const moment = require('moment');
const bcrypt = require('bcryptjs');
var QRCode = require('qrcode');
moment.locale('ro');
AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY });

exports.login = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  login(req, res, next);
};

exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const { password: currentPassword } = await User.findById(req.user.id);

  if (currentPassword !== oldPassword) {
    return res.status(422).json({ message: 'Ai introdus greșit parola curentă' });
  } else {
    await User.findOneAndUpdate({ _id: req.user.id }, { password: newPassword });
    return res.status(200).json({ success: newPassword });
  }
};

exports.register = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { username, password, name, email, logoUrl, city, coords, registrationSecret } = req.body;

    if (registrationSecret !== process.env.REGISTRATION_SECRET) {
      return res.status(422).json({ message: 'Wrong registration secret' });
    }

    const user = await User.create({ username, password, name, email, logoUrl, city, coords, joinDate: new Date() });

    const token = createAuthToken(user.toJSON());
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.validate = (method) => {
  const errors = [
    body('username')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom((value) => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('password')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ min: 4 })
      .withMessage('must be at least 8 characters long')

      .isLength({ max: 72 })
      .withMessage('must be at most 72 characters long'),
  ];

  if (method === 'register') {
    errors.push(
      body('username').custom(async (username) => {
        const exists = await User.countDocuments({ username });
        if (exists) throw new Error('already exists');
      }),
      body('name').exists().withMessage('is required'),
      body('email').exists().withMessage('is required'),
      body('logoUrl').exists().withMessage('is required'),
      body('city').exists().withMessage('is required'),
      body('coords').exists().withMessage('is required')
    );
  }

  return errors;
};

exports.getCurrentUser = (req, res, next) => {
  res.status(200).json(req.fullUser);
};

exports.uploadFileToS3 = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: (req, file, cb) => {
      cb(null, 'application/pdf');
    },
    key: (req, file, cb) => {
      if (file.mimetype != 'application/pdf') {
        cb({ type: 'invalidFileName', message: 'Te rog alege un fișier în format PDF.' });
      } else {
        const pdfKey = `${req.user.username}/${file.originalname + '-' + new Date().toISOString()}.pdf`;

        req.uploadedPdfKey = pdfKey;

        cb(null, pdfKey);
      }
    },
  }),
}).single('menu');

exports.updatePdfMenuUrl = async (req, res, next) => {
  try {
    const { location: pdfUrl, originalname: pdfOriginalName, size: pdfSize } = req.file;

    await User.findOneAndUpdate({ _id: req.user.id }, { pdfUrl, pdfOriginalName, pdfSize, pdfKey: req.uploadedPdfKey, pdfUploadDate: new Date() });

    res.status(200).json({ pdfUrl });
  } catch (err) {
    next(err);
  }
};

exports.showPdfMenu = async (req, res, next) => {
  try {
    const { restaurantSlug } = req.params;

    const user = await User.findOne({ username: restaurantSlug });

    if (!user) {
      return res.redirect('https://touchfreemenu.ro/');
    }

    const isIphone = req.headers['user-agent'].includes('(iPhone;');

    if (isIphone) {
      var s3 = new AWS.S3();

      s3.getObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: user.pdfKey,
        },
        (error, data) => {
          if (error === null) {
            res.set({
              'Content-Type': 'application/pdf',
            });

            return res.send(data.Body);
          } else {
            return res.status(500).send(error);
          }
        }
      );
    } else {
      return res.render('pdf-menu', {
        pdfUrl: user.pdfUrl,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.downloadQrCode = async (req, res, next) => {
  try {
    const { restaurantSlug } = req.params;

    QRCode.toString(`touchfreemenu.ro/${restaurantSlug}`, { type: 'svg' }, function (err, xml) {
      res.set({
        'Content-Type': 'image/svg+xml',
        'Content-Disposition': 'attachment',
      });
      res.send(xml);
    });
  } catch (err) {
    next(err);
  }
};

exports.showMenuIfValidSlug = async (req, res, next) => {
  const { restaurantSlug } = req.params;

  const user = await User.findOne({ username: restaurantSlug });

  if (user) {
    return res.render('web-menu');
  } else {
    next();
  }
};
