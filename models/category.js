const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    index: { type: Number },
  },
  { collation: { locale: 'en', strength: 1 } }
);

categorySchema.set('toJSON', { getters: true });
categorySchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Category', categorySchema);
