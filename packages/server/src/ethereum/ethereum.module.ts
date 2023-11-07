import { Module } from "@nestjs/common";
import { EthereumResolver } from "./ethereum.resolver";
import { EthereumService } from "./ethereum.service";

@Module({
  providers: [EthereumService, EthereumResolver],
})
export class EthereumModule {}
