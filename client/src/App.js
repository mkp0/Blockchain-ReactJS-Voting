import React, { useState, useEffect } from "react";
import Election from "./contracts/Election.json";
import { Form, Button } from "semantic-ui-react";
import getWeb3 from "./getWeb3";
import Table from "./Table";

function App() {
  // const [storageValue, setStorageValue] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [option, setOption] = useState([]);
  const [selectedOne, setSelectedOne] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();

        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const instance = new web3.eth.Contract(
          Election.abi,
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
        // await contract.methods.set(387).send({ from: accounts[0] });
        // const response = await contract.methods.get().call();
        // setStorageValue(response);
        let x = await contract.methods.allCandidates().call();
        setOption([]);
        console.log(x.length);
        let temp1 = [],
          temp2 = [];
        for (let i = 0; i < x.length; i++) {
          temp1.push({ text: x[i].name, value: x[i].id });
          temp2.push({
            id: x[i].id,
            name: x[i].name,
            voteCount: x[i].voteCount,
          });
        }
        setOption(temp1);
        setCandidates(temp2);
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

  const tolockKrDiyaJye = async () => {
    if (selectedOne === 0) {
      setMessage("select some candidate before voting");
      return;
    }
    setMessage("Transaction is on the way :|");
    await contract.methods.vote(selectedOne).send({
      from: accounts[0],
    });
    setMessage("Your vote accepted!!");
  };

  // <--------------------------jsx------------------------------->

  if (typeof web3 === "undefined") {
    return (
      <div className="App">
        Loading Web3, accounts, and contract... Reload page
      </div>
    );
  } else {
    return (
      <div>
        {/* <h1> stored value : {storageValue ? storageValue : "not set yet"}</h1> */}
        <h2>Your account is : {accounts}</h2>
        <Table candidates={candidates} />
        <Form.Select
          fluid
          label="Type"
          options={option}
          placeholder="Type"
          onChange={(e, { value }) => {
            setSelectedOne(value);
            console.log(value);
          }}
        />
        <Button primary onClick={tolockKrDiyaJye}>
          Vote
        </Button>
        <h2>{message}</h2>
      </div>
    );
  }
}

export default App;
