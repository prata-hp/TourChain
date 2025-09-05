const { recordJourney, toIdHashHex } = require("../utils/blockchain");

(async () => {
  try {
    // Example tourist ID
    const idHash = toIdHashHex("tourist-123");

    // Example dates
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const receipt = await recordJourney(idHash, startDate, endDate);
    console.log("Journey recorded ✅:", receipt);
  } catch (err) {
    console.error("Error running testRecord:", err);
  }
})();
