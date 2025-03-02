const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.getDailyExercises = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Fetch exercises matching user goal
    const exercises = await Exercise.find({ goal: user.goals }).limit(3); // 3 exercises per day
    if (!exercises.length) {
      return res.status(404).json({ msg: 'No exercises found for your goal' });
    }

    res.json(exercises);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Seed exercises (run once manually or via script)
exports.seedExercises = async (req, res) => {
  try {
    await Exercise.deleteMany({});
    const sampleExercises = [
      { name: 'Running', type: 'cardio', duration: 30, goal: 'weight_loss' },
      {
        name: 'Push-ups',
        type: 'strength',
        sets: 3,
        reps: 15,
        goal: 'muscle_gain',
      },
      {
        name: 'Yoga Stretch',
        type: 'flexibility',
        duration: 20,
        goal: 'maintenance',
      },
      { name: 'Cycling', type: 'cardio', duration: 45, goal: 'weight_loss' },
      {
        name: 'Bench Press',
        type: 'strength',
        sets: 4,
        reps: 10,
        goal: 'muscle_gain',
      },
    ];
    await Exercise.insertMany(sampleExercises);
    res.json({ msg: 'Exercises seeded' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
