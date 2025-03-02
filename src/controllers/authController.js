const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Signup

exports.signup = [
  //Validation
  check('email', "Iltimos to'g'ri email kiriting").isEmail(),
  check(
    'password',
    `Maxfiy kalit kamida 6+ simvoldan iborat bo'lishi kerak`
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, height, weight, age } = req.body;

    try {
      //Checking for user existing

      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: 'User already exists' });

      user = new User({ email, password, height, weight, age });

      await user.save();

      //Generating JWT

      const payload = { user: { id: user.id } };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

// Login
exports.login = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      //Verify password

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      //Generate JWT

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];
