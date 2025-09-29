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
