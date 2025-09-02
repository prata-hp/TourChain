const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const TouristRegistry = await hre.ethers.getContractFactory("TouristRegistry");
  const touristRegistry = await TouristRegistry.deploy();

  // ✅ new style in Hardhat v3
  await touristRegistry.waitForDeployment();

  console.log("TouristRegistry deployed to:", await touristRegistry.getAddress());

  // write to .env
  const envPath = path.join(__dirname, "..", ".env");
  const addr = await touristRegistry.getAddress();
  const line = `TOURIST_CONTRACT_ADDRESS=${addr}`;

  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .filter(Boolean)
      .filter(l => !l.startsWith("TOURIST_CONTRACT_ADDRESS="))
      .join("\n");
    envContent = envContent ? envContent + "\n" + line + "\n" : line + "\n";
  } else {
    envContent = line + "\n";
  }

  fs.writeFileSync(envPath, envContent, "utf8");
  console.log(".env file updated with TOURIST_CONTRACT_ADDRESS.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
