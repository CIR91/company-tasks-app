// web/backend/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const mongoose = require('mongoose');
const authRoutes    = require('./routes/auth');
const tasksRoutes   = require('./routes/tasks');
const usersRoutes   = require('./routes/users');
const companyRoutes = require('./routes/company');
const reportsRoutes = require('./routes/reports');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔗 MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/api/auth',    authRoutes);
app.use('/api/tasks',   tasksRoutes);
app.use('/api/users',   usersRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/reports', reportsRoutes);

// 404 y error genérico
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend en puerto ${PORT}`));
