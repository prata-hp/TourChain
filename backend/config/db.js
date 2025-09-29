const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI not set');
  await mongoose.connect(mongoUri);
  console.log('✅ MongoDB connected');
  return mongoose.connection;
}

module.exports = connectDB;
