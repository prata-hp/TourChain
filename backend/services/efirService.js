const EfirReport = require('../models/EfirReport');
const Profile = require('../models/Profile'); 
const ActiveJourney = require('../models/ActiveJourney');

// Helper to generate a unique ID (e.g., FIR-00001)
const generateEfirId = async () => {
    const count = await EfirReport.countDocuments({});
    return `FIR-${String(count + 1).padStart(5, '0')}`;
};

/**
 * Creates an E-FIR immediately after a PanicCall is successfully made.
 * @param {object} panicCall The newly created PanicCall document.
 */
exports.createEfirFromPanic = async (panicCall) => {
    try {
        const { userId, location, _id: panicId } = panicCall;

        // 1. Fetch required data (Profile for contacts/name)
        const profile = await Profile.findOne({ user: userId });
        
        if (!profile) {
            console.error('❌ EFIR Creation Failed: Tourist profile not found.');
            return;
        }

        // 2. Compile E-FIR data
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

        // 3. Create and Save the E-FIR Report
        const efirReport = await EfirReport.create(efirData);
        console.log(`✅ E-FIR FILED: ${efirReport.efirId} for Panic ID: ${panicId}`);

    } catch (error) {
        console.error('❌ CRITICAL ERROR during E-FIR creation:', error);
    }
};