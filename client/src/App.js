import React, { Component } from 'react';
import RafflesContract from './contracts/Raffles.json';
import getWeb3 from './getWeb3';

// raffle host and participant landing page
import HostTemplate from './HostTemplate';
import PTemplate from './PTemplate';
import './App.css';

class App extends Component {
	state = {
		raffleStart      : 0,
		raffleName       : null,
		totalTickets     : 0,
		raffleActive     : false,
		raffleId         : 0,
		randomString     : null,
		randomWinner     : 0,
		winningsTransfer : false,
		raffleRegister   : 0,
		raffleExists     : false,
		ticketsBought    : 0,
		web3             : null,
		accounts         : null,
		contract         : null
	};

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = RafflesContract.networks[networkId];
			const instance = new web3.eth.Contract(RafflesContract.abi, deployedNetwork && deployedNetwork.address);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance }, this.runExample);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Raffle Game</h1>
				<HostTemplate />
				<PTemplate />
			</div>
		);
	}
}

export default App;
