import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NAME = "ERC721Token";
const SYMBOL = "ERC721T";

const ERC721TokenModule = buildModule("ERC721Token", (m) => {
    const nameParam = m.getParameter("name", NAME);
    const symbolParam = m.getParameter("symbol", SYMBOL);

    const erc721 = m.contract("ERC721Token", [nameParam, symbolParam]);

    return { erc721 };
});

export default ERC721TokenModule;
