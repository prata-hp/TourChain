const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // The extra options object is no longer needed in modern Mongoose
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // This is the detailed log that shows the specific database name
        console.log(`✅ MongoDB Connected: HOST=${conn.connection.host} DB=${conn.connection.name}`);

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;