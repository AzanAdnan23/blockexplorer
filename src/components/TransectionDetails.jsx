import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "../alchemy.js";
const { Utils } = require('alchemy-sdk');

const TransactionDetail = () => {
  const { Txs } = useParams();

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [status, setStatus] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [type, setType] = useState("");
  const [transactionIndex, setTransactionIndex] = useState("");
  const [blockHash, setBlockHash] = useState("");

  async function fetchTxsData() {
    const response = await alchemy.core.getTransactionReceipt(Txs);

    setTo(response.to);
    setFrom(response.from);
    setBlockNumber(response.blockNumber);
    setBlockHash(response.blockHash);
    setContractAddress(response.contractAddress);
    setTransactionHash(response.transactionHash);
    setStatus(response.status);
    setType(response.type);
    setTransactionIndex(response.transactionIndex);
    setGasUsed(Utils.formatUnits(response.gasUsed, 'gwei'));


  }
  useEffect(() => {
    fetchTxsData();
  }, [Txs]);

  return (
    <div className="Transaction-Details">
      <h2><strong>Transaction Details</strong></h2>
      <p><strong>To:</strong> {to}</p>
      <p><strong>From:</strong> {from}</p>
      <p><strong>Transaction Hash:</strong> {transactionHash}</p>
      <p><strong>Block Number:</strong> {blockNumber}</p>
        <p><strong>Block Hash:</strong> {blockHash}</p>
      <p><strong>Contract Address:</strong> {contractAddress !== null ? contractAddress : 'null'}</p>
      <p><strong>Gas Used:</strong> {gasUsed} gwei</p>
      <p><strong>Position In Block:</strong> {transactionIndex}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Status:</strong> {status} </p>
    </div>
  );
};

export default TransactionDetail;
