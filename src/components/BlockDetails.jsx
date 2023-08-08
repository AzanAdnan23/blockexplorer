import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "../alchemy.js";
import Web3 from "web3";

const BlockDetail = () => {
  const { blockNumber } = useParams();
  const [hash, setHash] = useState("");
  const [parentHash, setParentHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [nonce, setNonce] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [miner, setMiner] = useState("");
  const [extraData, setExtraData] = useState("");

  async function fetchBlockData() {
    try {
      const response = await alchemy.core.getBlock(parseInt(blockNumber));

      setHash(response.hash);
      setParentHash(response.parentHash);
      setTimestamp(response.timestamp);
      setNonce(response.nonce);
      setDifficulty(response.difficulty);
      setGasLimit(response.gasLimit);
      setGasUsed(response.gasUsed);
      setMiner(response.miner);
      setExtraData(response.extraData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlockData();
  }, [blockNumber]);

  return (
    <div className="Block-Details">
      <h2>
        <strong>Block Detail for Block Number:</strong> {blockNumber}
      </h2>
      <p>
        <strong>Hash:</strong> {hash}
      </p>
      <p>
        <strong>Parent Hash:</strong> {parentHash}
      </p>
      <p>
        <strong>Timestamp:</strong>{" "}
        {timestamp && new Date(timestamp * 1000).toUTCString()}
      </p>
      <p>
        <strong>Nonce:</strong> {nonce}
      </p>
      <p>
        <strong>Difficulty:</strong> {difficulty}
      </p>

      <p>
        <strong>Gas Limit:</strong>{" "}
        {gasLimit && `${Web3.utils.fromWei(gasLimit, "wei")} wei`}
      </p>
      <p>
        <strong>Gas Used:</strong>{" "}
        {gasUsed && `${Web3.utils.fromWei(gasUsed, "wei")} wei`}
      </p>

      <p>
        <strong>Miner:</strong> {miner}
      </p>
      <p>
        <strong>Extra Data:</strong> {extraData}
      </p>
    </div>
  );
};

export default BlockDetail;
