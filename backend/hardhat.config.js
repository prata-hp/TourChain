require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Ganache RPC URL
      accounts: [
        "0xc9bfecb656df73252960208c134d26d6eafbaf51ba6fcb4b42f9f4c0be3fb71e"
      ]
    }
  }
};
