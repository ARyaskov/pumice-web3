import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DEPLOY_COLLECTION = gql`
  mutation DeployCollection($name: String!, $symbol: String!) {
    deployCollection(inputData: { name: $name, symbol: $symbol })
  }
`;

const MINT_NFT = gql`
  mutation mintNFT($address: String!, $tokenId: String!, $tokenUri: String!) {
    mintNFT(
      inputData: { address: $address, tokenId: $tokenId, tokenURI: $tokenUri }
    )
  }
`;

function Application() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [mintResult, setMintResult] = useState("");
  const [deployCollection] = useMutation(DEPLOY_COLLECTION);
  const [mintNFT] = useMutation(MINT_NFT);

  const handleDeploy = async () => {
    if (!name || !symbol) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await deployCollection({
        variables: { name, symbol },
      });
      setAddress(data.deployCollection);
      setResult(`Collection deployed at: ${data.deployCollection}`);
    } catch (error) {
      console.error("Error deploying collection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = () => {
    if (!tokenId || !tokenUri) {
      return;
    }

    setLoading(true);

    mintNFT({
      variables: {
        address: address,
        tokenId: tokenId,
        tokenUri: tokenUri,
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.data && response.data.mintNFT) {
          setMintResult(
            `tokenId = ${tokenId} and tokenUri = ${tokenUri} successfully minted!`,
          );
        } else {
          setMintResult("Minting NFT failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        setMintResult("Minting NFT failed");
      });
  };

  return (
    <div>
      <div>
        <h2>Deploy Collection</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={handleDeploy} disabled={loading || !name || !symbol}>
          Deploy!
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {result && !loading && (
        <div>
          <label>{result}</label>
        </div>
      )}

      <div>
        <h2>Mint NFT</h2>
        <input
          type="number"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token URI"
          value={tokenUri}
          onChange={(e) => setTokenUri(e.target.value)}
        />
        <button
          onClick={handleMint}
          disabled={loading || !tokenId || !tokenUri}
        >
          Mint!
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {mintResult && !loading && (
        <div>
          <label>{mintResult}</label>
        </div>
      )}
    </div>
  );
}

export default Application;
