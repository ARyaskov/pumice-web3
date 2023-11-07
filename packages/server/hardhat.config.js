require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {

    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "6e1e260432d642286269a7b61e1cdd5c10b9d65d49f69c7c9cc730d63029aff4"
      ],
    }
  },
  solidity: "0.8.19",
};

