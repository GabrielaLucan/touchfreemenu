const CovidQuestionnaire = require('../models/covidQuestionnaire');
const User = require('../models/user');

exports.submitQuestionnaire = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, tableSeated } = req.body;

    const questionnaire = await CovidQuestionnaire.create({ name, phoneNumber, email, tableSeated, ip: req.ip, date: new Date() });

    res.status(201).json(questionnaire);
  } catch (err) {
    next(err);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const { isCovidQuestionnaireEnabled } = await User.findById(req.user.id);

    await User.findOneAndUpdate({ _id: req.user.id }, { isCovidQuestionnaireEnabled: !isCovidQuestionnaireEnabled });

    res.status(201).json({ newValue: isCovidQuestionnaireEnabled });
  } catch (err) {
    next(err);
  }
};
