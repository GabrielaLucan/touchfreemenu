const mongoose = require('mongoose');

const demoRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { collation: { locale: 'en', strength: 1 } }
);

demoRequestSchema.set('toJSON', { getters: true });
demoRequestSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);

module.exports = DemoRequest;
