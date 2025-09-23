async function main() {
  // 1. Get the contract to deploy
  const TourChainLedger = await ethers.getContractFactory("TourChainLedger");
  console.log("Deploying TourChainLedger...");

  // 2. Deploy it
  const ledger = await TourChainLedger.deploy();
  await ledger.waitForDeployment(); // Wait for the transaction to be mined

  // 3. Print the address and block number
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