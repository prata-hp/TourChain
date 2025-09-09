const { ethers } = require("ethers");
require("dotenv").config();

const RPC = process.env.BLOCKCHAIN_RPC || "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const ABI = require("./abi/TouristRegistry.json").abi;

const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

/**
 * Converts an ID string to a hashed hex value compatible with the contract.
 * @param {string} str - The ID string to hash.
 * @returns {string} A 0x-prefixed keccak256 hash.
 */
function toIdHashHex(str) {
  return ethers.keccak256(ethers.toUtf8Bytes(str.trim().toLowerCase()));
}

/**
 * Records a journey on the blockchain.
 * Validates the input hash format before sending the transaction.
 * @param {string} idHashHex - The hashed ID in 0x-prefixed format.
 * @param {string} startDateISO - ISO formatted start date.
 * @param {string} endDateISO - ISO formatted end date.
 * @returns {object} Transaction hash and block number.
 */
async function recordJourney(idHashHex, startDateISO, endDateISO) {
  // Validate idHashHex format
  if (typeof idHashHex !== "string" || !idHashHex.startsWith("0x") || idHashHex.length !== 66) {
    throw new Error(`Invalid idHashHex format. Expected 0x-prefixed 64-hex chars, got: ${idHashHex}`);
  }

  const start = Math.floor(new Date(startDateISO).getTime() / 1000);
  const end = Math.floor(new Date(endDateISO).getTime() / 1000);

  if (isNaN(start) || isNaN(end)) {
    throw new Error("Invalid start or end date.");
  }

  // Call the smart contract function
  const tx = await contract.recordJourney(idHashHex, start, end);
  const receipt = await tx.wait();

  return { txHash: receipt.hash, blockNumber: receipt.blockNumber };
}

module.exports = { recordJourney, toIdHashHex };
