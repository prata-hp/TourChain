const EfirReport = require('../models/EfirReport');
const Profile = require('../models/Profile'); 
const ActiveJourney = require('../models/ActiveJourney');
const generateEfirId = async () => {
    const count = await EfirReport.countDocuments({});
    return `FIR-${String(count + 1).padStart(5, '0')}`;
};
exports.createEfirFromPanic = async (panicCall) => {
    try {
        const { userId, location, _id: panicId } = panicCall;
        const profile = await Profile.findOne({ user: userId });
        
        if (!profile) {
            console.error('❌ EFIR Creation Failed: Tourist profile not found.');
            return;
        }
        const efirId = await generateEfirId();
        const efirData = {
            efirId,
            panicCall: panicId,
            tourist: userId,
            fullName: profile.fullName || 'N/A',
            emergencyContacts: profile.emergencyContacts,
            incidentLocation: location,
            incidentTimestamp: new Date(),
        };
        const efirReport = await EfirReport.create(efirData);
        console.log(`✅ E-FIR FILED: ${efirReport.efirId} for Panic ID: ${panicId}`);

    } catch (error) {
        console.error('❌ CRITICAL ERROR during E-FIR creation:', error);
    }
};