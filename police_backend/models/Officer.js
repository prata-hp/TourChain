const mongoose = require('mongoose');
const officerSchema = new mongoose.Schema({
    officerId: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    station: String,
    role: { type: String, enum: ['Admin', 'Supervisor', 'Officer'], default: 'Officer' },
}, { timestamps: true });
module.exports = mongoose.model('Officer', officerSchema);