require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');

// Import Models
const User = require('./models/User');
const Progress = require('./models/Progress');
const Project = require('./models/Project');
const Portfolio = require('./models/Portfolio');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const progressRoutes = require('./routes/progressRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/projects', projectRoutes);

/* =========================
   RELASI ANTAR TABEL
========================= */

// User -> Progress (One to Many)
User.hasMany(Progress, {
  foreignKey: 'userId',
  as: 'progressList',
});

Progress.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User -> Project (One to Many)
User.hasMany(Project, {
  foreignKey: 'userId',
  as: 'projects',
});

Project.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User -> Portfolio (One to One)
User.hasOne(Portfolio, {
  foreignKey: 'userId',
  as: 'portfolio',
});

Portfolio.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

/* =========================
   TEST DATABASE + SYNC
========================= */

async function startServer() {
  try {
    console.log('🔄 Connecting to Supabase...');

    await sequelize.authenticate();

    console.log('✅ Database Connected Successfully');

    await sequelize.sync({ alter: true });

    console.log('✅ Tables Synced Successfully');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on Port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Database Connection Failed');
    console.error(error);
  }
}

/* =========================
   ROUTES
========================= */

app.get('/', (req, res) => {
  res.send('Automated Portfolio Coach API Running');
});

startServer();