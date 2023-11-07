import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Inject } from "@nestjs/common";
import { EthereumService } from "./ethereum.service";
import {
  InputDataDeployCollectionDTO,
  InputDataMintNFTDTO,
} from "./dto/ethereum.dto";

@Resolver("Ethereum")
export class EthereumResolver {
  constructor(
    @Inject(EthereumService) private readonly ethereumService: EthereumService,
  ) {}

  @Mutation((returns) => String)
  async deployCollection(
    @Args("inputData") inputData: InputDataDeployCollectionDTO,
  ): Promise<string> {
    const result = await this.ethereumService.deployCollection(
      inputData.name,
      inputData.symbol,
    );
    return result;
  }

  @Mutation((returns) => Boolean)
  async mintNFT(
    @Args("inputData") inputData: InputDataMintNFTDTO,
  ): Promise<boolean> {
    await this.ethereumService.mintNFT(
      inputData.address,
      inputData.tokenId,
      inputData.tokenURI,
    );
    return true;
  }
}
