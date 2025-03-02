const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const progressController = require('../controllers/progressController');

router.post('/exercise', auth, progressController.logExercise);
router.post('/meal', auth, progressController.logMeal);
router.post('/weight', auth, progressController.logWeight);
router.get('/', auth, progressController.getProgress);

module.exports = router;
