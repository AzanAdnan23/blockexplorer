import React, { useEffect, useState } from "react";
import { alchemy } from "../alchemy.js";

function Transaction() {
  const [Txs, setTxs] = useState([]);

  useEffect(() => {
    async function getTxs() {
      try {
        const blocknumber = await alchemy.core.getBlockNumber();
        const BlockResponse = await alchemy.core.getBlock(
          parseInt(blocknumber)
        );
        const recentTxs = BlockResponse.transactions.slice(0, 6);
        setTxs(recentTxs);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }}
    getTxs(); 
  }, []);
  return (
    <div className="Txs">
      <h2>Latest Transactions</h2>
      <ul>
        {Txs.map((tx, index) => (
          <li key={index}>
            <a href={`/transaction/${tx}`}>Transaction: {tx}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transaction;
