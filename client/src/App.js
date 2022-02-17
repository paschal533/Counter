import React, { Component } from "react";
import CounterContract from "./contracts/Counter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {loaded:false, count: 0, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
    
       this.counter = new this.web3.eth.Contract(
         CounterContract.abi,  CounterContract.networks[this.networkId] &&  CounterContract.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    // Get the value from the contract to prove it worked.
    const response = await this.counter.methods.ViewCount().call();
    // Update state with the result.
    this.setState({count: response})
  };

  handleIncrease = async() => {
    await this.counter.methods.IncrementCount().send({ from: this.accounts[0] })
    await this.runExample()
  }

  handleReduce = async() => {
    await this.counter.methods.DecrementCount().send({ from: this.accounts[0] })
    await this.runExample()
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Count...</div>;
    }
    return (
      <div className="App">
        <h1>Counts</h1>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleIncrease}>Increment count</button><button onClick={this.handleReduce}>decrement count</button>
      </div>
    );
  }
}

export default App;
