import { useEffect, useState } from "react";
import { alchemy } from "../alchemy.js";

function Header() {
  const [blockNumber, setBlockNumber] = useState();
  const [gas, setGas] = useState();
  const [ethPrice, setEthPrice] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setBlockNumber(await alchemy.core.getBlockNumber());
      } catch (error) {
        console.error("Error fetching block number:", error);
      }

      try {
        const responseInHex = await alchemy.core.getGasPrice();
        const gasWei = parseInt(responseInHex, 16);
        const gasGwei = gasWei / 100000000000; // Convert wei to gwei
        setGas(parseInt(gasGwei));
      } catch (error) {
        console.error("Error fetching Gas Price:", error);
      }

      try {
        const coingeckoResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const coingeckoData = await coingeckoResponse.json();
        const ethPrice = coingeckoData.ethereum.usd;

        setEthPrice(ethPrice);
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Header">
      <h1>Ethereum Block Explorer</h1>
      <div className="EthPrice"> Eth Price: ${ethPrice} </div>
      <div className="BlockNum"> Block Number: {blockNumber}</div>
      {gas && <div className="GasP"> Gas Price: {gas} gwei </div>}
    </div>
  ); // gas && --> checking if gas is defined before attempting to render the Gas Price section
}

export default Header;
