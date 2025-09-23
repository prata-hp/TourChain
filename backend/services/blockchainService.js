const { ethers } = require("ethers");
require("dotenv").config();

// --- Configuration ---
const RPC = process.env.BLOCKCHAIN_RPC || "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ABI = require("../utils/abi/TourChainLedger.json").abi; // UPDATE: Use the new ABI

// --- Ethers Setup ---
const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

/**
 * Hashes a string (like a MongoDB ID) into a bytes32 format for the contract.
 * @param {string} idString - The string to hash.
 * @returns {string} A 0x-prefixed keccak256 hash.
 */
function toJourneyId(idString) {
    return ethers.keccak256(ethers.toUtf8Bytes(idString));
}

/**
 * NEW: Hashes the critical details of a panic event into a single bytes32 hash.
 * This is efficient and saves gas compared to storing raw data on-chain.
 * @param {object} panicData - The panic call object from the database.
 * @returns {string} A 0x-prefixed keccak256 hash of the panic details.
 */
function createPanicDataHash(panicData) {
    const dataString = `${panicData.location.lat},${panicData.location.lng},${panicData.timestamp},${panicData.type}`;
    return ethers.keccak256(ethers.toUtf8Bytes(dataString));
}


/**
 * Records the start of a journey on the blockchain.
 * @param {object} journeyData - The ActiveJourney document from MongoDB.
 * @returns {Promise<string>} The blockchain transaction hash.
 */
async function recordJourneyStart(journeyData) {
    const journeyId = toJourneyId(journeyData._id.toString());
    const startDate = Math.floor(new Date(journeyData.startDate).getTime() / 1000);
    const endDate = Math.floor(new Date(journeyData.endDate).getTime() / 1000);

    const tx = await contract.startJourney(journeyId, startDate, endDate);
    const receipt = await tx.wait();
    console.log(`✅ Journey Start Recorded. TxHash: ${receipt.hash}`);
    return receipt.hash;
}

/**
 * NEW: Records a panic event on the blockchain.
 * @param {object} panicData - The PanicCall document from MongoDB.
 * @returns {Promise<string>} The blockchain transaction hash.
 */
async function recordPanicEvent(panicData) {
    const journeyId = toJourneyId(panicData.journeyId.toString());
    const dataHash = createPanicDataHash(panicData);

    const tx = await contract.alertPanic(journeyId, dataHash);
    const receipt = await tx.wait();
    console.log(`🚨 Panic Event Recorded. TxHash: ${receipt.hash}`);
    return receipt.hash;
}

/**
 * NEW: Records the end of a journey on the blockchain.
 * @param {object} journeyData - The ActiveJourney document from MongoDB.
 * @returns {Promise<string>} The blockchain transaction hash.
 */
async function recordJourneyEnd(journeyData) {
    const journeyId = toJourneyId(journeyData._id.toString());

    const tx = await contract.endJourney(journeyId);
    const receipt = await tx.wait();
    console.log(`🏁 Journey End Recorded. TxHash: ${receipt.hash}`);
    return receipt.hash;
}


module.exports = { 
    recordJourneyStart, 
    recordPanicEvent, 
    recordJourneyEnd 
};