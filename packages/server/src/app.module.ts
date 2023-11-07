import { Module } from "@nestjs/common";
import { EthereumModule } from "./ethereum/ethereum.module";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { resolve } from "path";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HOST: Joi.string(),
        PORT: Joi.number(),
      }),
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      ide: true,
      typePaths: [resolve(__dirname, "../../graphql/**/*.graphql")],
      path: "/api/v0/graphql",
      subscription: true,
    }),
    EthereumModule,
  ],
})
export class AppModule {}
