import React, { useEffect, useState } from "react";
import { alchemy } from "../alchemy.js";

function Block() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function getBlocksAndTxs() {
      const recentBlocks = [];

      const blocknumber = await alchemy.core.getBlockNumber();

      for (let i = 0; i < 5; i++) {
        recentBlocks.push(blocknumber - i);
      }

      // Set the populated array in the state
      setBlocks(recentBlocks);
    }

    getBlocksAndTxs(); // Call the function to populate the array
  }, []);

  return (
    <div className="blocks">
      <h2>Latest Blocks</h2>
      <ul>
        {blocks.map((blockNumber) => (
          <li key={blockNumber}>
            <a href={`/block/${blockNumber}`}>Block Number: {blockNumber}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Block;
