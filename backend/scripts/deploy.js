async function main() {
  const TourChainLedger = await ethers.getContractFactory("TourChainLedger");
  console.log("Deploying TourChainLedger...");
  const ledger = await TourChainLedger.deploy();
  await ledger.waitForDeployment();
  const address = await ledger.getAddress();
  const block = await ethers.provider.getBlockNumber();
  console.log(`✅ TourChainLedger deployed to: ${address}`);
  console.log(`✅ Deployed in block number: ${block}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });