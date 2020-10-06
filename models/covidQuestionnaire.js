const mongoose = require('mongoose');

const covidQuestionnaireSchema = new mongoose.Schema(
  {
    targetRestaurant: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    tableSeated: { type: String },
    ip: { type: String },
  },
  { collation: { locale: 'en', strength: 1 } }
);

covidQuestionnaireSchema.set('toJSON', { getters: true });
covidQuestionnaireSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const CovidQuestionnaire = mongoose.model('CovidQuestionnaire', covidQuestionnaireSchema);

module.exports = CovidQuestionnaire;
