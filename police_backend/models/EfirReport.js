const mongoose = require('mongoose');

const efirReportSchema = new mongoose.Schema({
    // Unique identifier for the report
    efirId: { type: String, required: true, unique: true }, 
    
    // Link to the panic event
    panicCall: { type: mongoose.Schema.Types.ObjectId, ref: 'PanicCall', required: true, unique: true },

    // Tourist and Contact Information
    tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String }, 
    emergencyContacts: [Object], 
    
    // Location and time of incident
    incidentLocation: { lat: Number, lng: Number },
    incidentTimestamp: { type: Date, default: Date.now },
    
    // Status
    status: { type: String, enum: ['Filed', 'Processing', 'Closed'], default: 'Filed' },
    
    // Optional: Blockchain hash if you're recording the FIR on the chain
    blockchainTx: String

}, { timestamps: true });

module.exports = mongoose.model('EfirReport', efirReportSchema);