const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  goal: { type: String, enum: ['weight_loss', 'muscle_gain', 'maintenance'] },
});

module.exports = mongoose.model('Meal', mealSchema);
