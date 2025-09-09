require("dotenv").config();
const mongoose = require("mongoose");
const Tourist = require("./models/tourist");
const { recordJourney, toIdHashHex } = require("./utils/blockchain");

async function test() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Find the tourist inserted in Compass
    const tourist = await Tourist.findOne({ email: "testuser@example.com" });
    if (!tourist) {
      console.error("❌ Tourist not found");
      process.exit(1);
    }

    console.log("👤 Found tourist:", tourist.name);

    // Compute idHashHex (example: using Aadhaar + phone)
    const idHashHex = toIdHashHex(`aadhaar-${tourist.phone}`);
    console.log("🔑 idHashHex:", idHashHex);

    // Call blockchain function
    const result = await recordJourney(idHashHex, tourist.startDate, tourist.endDate);

    console.log("🚀 Journey recorded!", result);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

test();
