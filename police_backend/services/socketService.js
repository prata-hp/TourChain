const PanicCall = require('../models/PanicCall');

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('✅ Police Dashboard connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('❌ Police Dashboard disconnected:', socket.id);
        });
    });

    const changeStream = PanicCall.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const newPanicCall = change.fullDocument;
            console.log('🚨 New Panic Alert Detected! Pushing to dashboards...');
            io.emit('new-panic-alert', newPanicCall);
        }
    });

    // --- ADD THIS FOR ROBUSTNESS ---
    changeStream.on('error', (error) => {
        console.error('❌ Change Stream Error:', error);
    });
};

module.exports = { initializeSocket };