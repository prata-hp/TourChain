const PanicCall = require('../models/PanicCall');

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('✅ Police Dashboard connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('❌ Police Dashboard disconnected:', socket.id);
        });
    });


    try {
        const changeStream = PanicCall.watch();

        changeStream.on('change', (change) => {
            if (change.operationType === 'insert') {
                const newPanicCall = change.fullDocument;
                console.log('🚨 New Panic Alert Detected! Pushing to dashboards...');
                io.emit('new-panic-alert', newPanicCall);
            }
        });

        changeStream.on('error', (error) => {
            console.error('❌ Change Stream Error:', error.message);
            console.log('⚠️  Real-time updates disabled. Consider setting up MongoDB replica set for change streams.');
        });

        console.log('✅ Real-time panic monitoring initialized');
    } catch (error) {
        console.error('❌ Failed to initialize change stream:', error.message);
        console.log('⚠️  Real-time updates disabled. Using polling fallback for production.');
        
       
        setInterval(async () => {
            try {
                const recentPanics = await PanicCall.find({
                    createdAt: { $gte: new Date(Date.now() - 15000) }, 
                    status: 'Active'
                }).sort({ createdAt: -1 }).limit(5);
                
                recentPanics.forEach(panic => {
                    io.emit('new-panic-alert', panic);
                });
            } catch (pollError) {
                
            }
        }, 10000);
    }
};

module.exports = { initializeSocket };
