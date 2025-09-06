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

const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("TouristRegistry");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();
  const addr = await contract.getAddress();
  console.log("TouristRegistry deployed to:", addr);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
