const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number },
    isDiscounted: { type: Boolean },
    ingredients: [String],
    quantities: [Number],
    index: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { collation: { locale: 'en', strength: 1 } }
);

productSchema.set('toJSON', { getters: true });
productSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Product', productSchema);
