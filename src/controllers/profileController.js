const User = require('../models/User');
const { check, validationResult } = require('express-validator');

//Get profile

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = [
  check('height', 'Height must be a number').optional().isNumeric(),
  check('weight', 'Weight must be a number').optional().isNumeric(),
  check('age', 'Age must be a number').optional().isNumeric(),
  check('goals', 'Invalid goal')
    .optional()
    .isIn(['weight_loss', 'muscle_gain', 'maintenance']),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { height, weight, age, goals } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Update fields

      if (height) user.height = height;
      if (weight) user.weight = weight;
      if (age) user.age = age;
      if (goals) user.goals = goals;

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];
