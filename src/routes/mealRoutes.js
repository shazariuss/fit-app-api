const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mealController = require('../controllers/mealController');

router.get('/daily', auth, mealController.getDailyMeals);
router.post('/seed', mealController.seedMeals);

module.exports = router;
