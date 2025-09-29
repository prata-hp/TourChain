require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Ganache RPC URL
      accounts: [
        "0x3c4ee73f5ce261de02c79b950ab988f01e133df71b8e6fc7fbf06d9954430e74"
      ]
    }
  }
};
