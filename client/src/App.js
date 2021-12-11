import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

function App() {
  const [storageValue, setStorageValue] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();

        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setWeb3(web3);
        setContract(instance);
        setAccounts(accounts);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const runExample = async () => {
      try {
        await contract.methods.set(387).send({ from: accounts[0] });

        const response = await contract.methods.get().call();

        setStorageValue(response);
      } catch {
        alert(
          "No contract deployed or account error; please check that MetaMask is on the correct network, reset the account and reload page"
        );
      }
    };
    if (
      typeof web3 != "undefined" &&
      typeof accounts != "undefined" &&
      typeof contract != "undefined"
    ) {
      runExample();
    }
  }, [web3, accounts, contract]);

  if (typeof web3 === "undefined") {
    return (
      <div className="App">
        Loading Web3, accounts, and contract... Reload page
      </div>
    );
  } else {
    return (
      <div>
        <h1> stored value : {storageValue ? storageValue : "not set yet"}</h1>
      </div>
    );
  }
}

export default App;
