import { Injectable } from "@nestjs/common";
import * as ethers from "ethers";
import * as process from "process";
import path from "path";
import fs from "fs";
import { ContractFactory, Mnemonic, Signer } from "ethers";

const TOKEN_ARTIFACT_PATH = path.resolve(
  __dirname,
  "../../../artifacts/contracts/ERC721Token.sol/ERC721Token.json",
);
const TOKEN_ARTIFACT = JSON.parse(
  fs.readFileSync(TOKEN_ARTIFACT_PATH).toString(),
);

@Injectable()
export class EthereumService {
  private factory: ContractFactory;
  private ownerAddress: string;
  private signer: Signer;
  private contract: any;
  constructor() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC);
    const wallet = ethers.HDNodeWallet.fromMnemonic(
      Mnemonic.fromPhrase(process.env.OWNER_MNEMONIC),
    );
    this.signer = wallet.connect(provider);
    this.factory = new ContractFactory(
      TOKEN_ARTIFACT.abi,
      TOKEN_ARTIFACT.bytecode,
      this.signer,
    );
  }
  async deployCollection(name: string, symbol: string) {
    this.contract = await this.factory.deploy(name, symbol, {
      gasPrice: 5 * 1_000_000_000,
      gasLimit: 6_000_000,
    });
    let eventFilter = this.contract.filters.CollectionCreated();
    let events = await this.contract.queryFilter(eventFilter);
    console.log(`#Event name: CollectionCreated`);
    console.log(
      `Collection: ${events[0].args[0]}, name: ${events[0].args[1]}, symbol: ${events[0].args[2]}`,
    );

    console.log(
      `Transaction ID: ${this.contract.deploymentTransaction().hash}`,
    );
    return await this.contract.getAddress();
  }

  async mintNFT(address: string, tokenId: number, tokenURI: string) {
    this.ownerAddress = await this.signer.getAddress();
    this.contract.on(
      "TokenMinted",
      (
        collection: string,
        recipient: string,
        tokenId: string,
        tokenUri: string,
      ) => {
        console.log(`#Event name: TokenMinted`);
        console.log(
          `Collection: ${collection}, recipient: ${recipient}, tokenId: ${tokenId}, tokenUri: ${tokenUri}`,
        );
      },
    );
    const transaction = await this.contract.mintNFT(
      this.ownerAddress,
      tokenId,
      tokenURI,
      {
        gasPrice: 50 * 1_000_000_000,
        gasLimit: 100_000,
      },
    );
    const transactionReceipt = await transaction.wait();

    console.log(`Transaction ID: ${transactionReceipt.hash}`);
    return true;
  }
}
