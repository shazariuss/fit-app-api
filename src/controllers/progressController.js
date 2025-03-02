const Progress = require('../models/Progress');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// Log exercise
exports.logExercise = [
  check('exerciseId', 'Exercise ID is required').isMongoId(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { exerciseId } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const progress = new Progress({
        user: req.user.id,
        type: 'exercise',
        exercise: exerciseId,
      });
      await progress.save();

      res.status(201).json(progress);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

// Log meal
exports.logMeal = [
  check('mealId', 'Meal ID is required').isMongoId(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mealId } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const progress = new Progress({
        user: req.user.id,
        type: 'meal',
        meal: mealId,
      });
      await progress.save();

      res.status(201).json(progress);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

// Log weight
exports.logWeight = [
  check('weight', 'Weight must be a number').isNumeric(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { weight } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Update user weight
      user.weight = weight;
      await user.save();

      // Log progress
      const progress = new Progress({
        user: req.user.id,
        type: 'weight',
        weight,
      });
      await progress.save();

      res.status(201).json(progress);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

// Get progress history
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate('exercise', 'name type')
      .populate('meal', 'name calories')
      .sort({ date: -1 }); // Newest first

    res.json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
