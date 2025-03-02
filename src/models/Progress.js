const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['exercise', 'meal', 'weight'], required: true },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: false,
  },
  meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: false },
  weight: { type: Number, required: false }, // in kg
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', progressSchema);
