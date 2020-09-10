const DemoRequest = require('../models/demoRequest');

exports.requestDemo = async (req, res, next) => {
  try {
    const { email } = req.body;

    const demoRequest = await DemoRequest.create({ email, date: new Date() });

    res.status(201).json({ succesfullyRequested: true });
  } catch (err) {
    next(err);
  }
};
