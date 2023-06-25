require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
const ALCHEMY_MUMBAI_API_KEY = process.env.ALCHEMY_MUMBAI_API_KEY;
const ACCOUNT_ETH__PRIVATE_KEY = process.env.ACCOUNT_ETH__PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_API_KEY}`,
      accounts: [ACCOUNT_ETH__PRIVATE_KEY]
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`,
      accounts: [ACCOUNT_ETH__PRIVATE_KEY]
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [ACCOUNT_ETH__PRIVATE_KEY]
    }
  }
};