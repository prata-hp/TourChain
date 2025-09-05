const { ethers } = require("ethers");
require("dotenv").config();

const RPC = process.env.BLOCKCHAIN_RPC || "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const ABI = require("./abi/TouristRegistry.json").abi;

const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

function toIdHashHex(str) {
  return ethers.keccak256(ethers.toUtf8Bytes(str.trim().toLowerCase()));
}

async function recordJourney(idHashHex, startDateISO, endDateISO) {
  const start = Math.floor(new Date(startDateISO).getTime() / 1000);
  const end = Math.floor(new Date(endDateISO).getTime() / 1000);

  const tx = await contract.recordJourney(idHashHex, start, end);
  const receipt = await tx.wait();
  return { txHash: receipt.hash, blockNumber: receipt.blockNumber };
}

module.exports = { recordJourney, toIdHashHex };
