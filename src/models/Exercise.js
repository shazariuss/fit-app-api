const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility'],
    required: true,
  },
  duration: { type: Number }, // in minutes (for cardio/flexibility)
  sets: { type: Number }, // for strength
  reps: { type: Number }, // for strength
  goal: { type: String, enum: ['weight_loss', 'muscle_gain', 'maintenance'] },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
