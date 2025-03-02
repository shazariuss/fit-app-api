const Meal = require('../models/Meal');
const User = require('../models/User');

exports.getDailyMeals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const meals = await Meal.find({ goal: user.goals }).limit(3); // 3 meals per day
    if (!meals.length) {
      return res.status(404).json({ msg: 'No meals found for your goal' });
    }

    res.json(meals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.seedMeals = async (req, res) => {
  try {
    await Meal.deleteMany({});
    const sampleMeals = [
      {
        name: 'Grilled Chicken Salad',
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 10,
        goal: 'weight_loss',
      },
      {
        name: 'Protein Shake',
        calories: 600,
        protein: 50,
        carbs: 40,
        fat: 15,
        goal: 'muscle_gain',
      },
      {
        name: 'Oatmeal',
        calories: 400,
        protein: 15,
        carbs: 60,
        fat: 10,
        goal: 'maintenance',
      },
    ];
    await Meal.insertMany(sampleMeals);
    res.json({ msg: 'Meals seeded' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
