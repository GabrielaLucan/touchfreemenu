const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    logoUrl: String,
    pdfUrl: String,
    pdfKey: String,
    pdfUploadDate: Date,
    pdfOriginalName: String,
    pdfSize: Number,
    joinDate: Date,
    city: String,
    coords: {
      latitude: Number,
      longitude: Number,
    },
    isCovidQuestionnaireEnabled: Boolean
  },
  { collation: { locale: 'en', strength: 1 } }
);

userSchema.set('toJSON', { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return password == this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
