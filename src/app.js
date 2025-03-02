const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const mealRoutes = require('./routes/mealRoutes');
const progressRoutes = require('./routes/progressRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger.yaml');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user/profile', profileRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/protected', auth, (req, res) => {
  res.json({ msg: 'You accessed a protected route!', userId: req.user.id });
});

app.get('/', (req, res) => {
  res.send('Fitness App Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
