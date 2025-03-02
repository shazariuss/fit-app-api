const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const exerciseController = require('../controllers/exerciseController');

router.get('/daily', auth, exerciseController.getDailyExercises);
router.post('/seed', exerciseController.seedExercises); // Temporary for testing

module.exports = router;
