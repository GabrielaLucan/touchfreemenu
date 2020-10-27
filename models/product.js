const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    imageKey: { type: String },
    categoryId: { type: String, required: true },
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

productSchema.virtual('category', {
  ref: 'Category', // The model to use
  localField: 'categoryId', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true,
  options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model('Product', productSchema);
