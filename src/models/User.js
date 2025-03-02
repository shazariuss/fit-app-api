const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number },
  weight: { type: Number },
  age: { type: Number },
  goals: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'maintenance'],
    default: 'maintenance',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10); // Await the salt generation
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
