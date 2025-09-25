const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: { type: String }, // This line is now corrected
    email: { type: String, unique: true, sparse: true }, // sparse allows multiple null emails
    idType: String,
    idNumberHash: String,
    medical: { bloodType: String, allergies: [String], conditions: [String] },
    emergencyContacts: [{ name: String, phone: String }],
    familyMembers: [{ fullName: String, age: Number, idNumberHash: String }],
    documentWallet: [{ docName: String, docUrl: String }]
}, { timestamps: true });
module.exports = mongoose.model('Profile', profileSchema);