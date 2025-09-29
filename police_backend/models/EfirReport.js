const mongoose = require('mongoose');

const efirReportSchema = new mongoose.Schema({
    
    efirId: { type: String, required: true, unique: true }, 
    
    
    panicCall: { type: mongoose.Schema.Types.ObjectId, ref: 'PanicCall', required: true, unique: true },

    
    tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String }, 
    emergencyContacts: [Object], 
    
  
    incidentLocation: { lat: Number, lng: Number },
    incidentTimestamp: { type: Date, default: Date.now },
    
   
    status: { type: String, enum: ['Filed', 'Processing', 'Closed'], default: 'Filed' },
    
    blockchainTx: String

}, { timestamps: true });

module.exports = mongoose.model('EfirReport', efirReportSchema);
