# pumice-web3 — Simplified NFT Collection Creator
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)
![Solidity Badge](https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=fff&style=flat)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=flat&logo=graphql&logoColor=white)

## Overview

Small example of how to create an NFT collection using [Hardhat](https://hardhat.org/), [Ethers.js 6](https://docs.ethers.org/v6/) and [TypeScript 5](https://www.typescriptlang.org/).


## Requirements

- Node.js 18
- TypeScript 5


## How to launch

```bash
# Install dependencies
yarn

cd packages/server
cp sample.env .env

# Compile contracts
yarn smartcontracts:compile

# Run local blockchain node
yarn blockchain:start

# In another terminal
# Start the server
yarn start:dev

# In another terminal
cd packages/ui
yarn start:dev
```

and visit the page at http://localhost:1234

