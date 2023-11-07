// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Token is ERC721Enumerable, Ownable {
    string private baseTokenURI;

    event CollectionCreated(address indexed collection, string name, string symbol);
    event TokenMinted(address indexed collection, address indexed recipient, uint256 tokenId, string tokenUri);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable() {
        emit CollectionCreated(address(this), name, symbol);
    }

    function mintNFT(address recipient, uint256 tokenId, string memory tokenUri) public onlyOwner {
        _mint(recipient, tokenId);
        setBaseURI(tokenUri);
        emit TokenMinted(address(this), recipient, tokenId, tokenUri);
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
