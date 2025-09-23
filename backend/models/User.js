const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Tourist', 'Admin'], default: 'Tourist' }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);