// This is the code for the host's user journey
// the rest of the jsx files can be found in src/host folder
//starting the raffle takes two steps: step 1 is to select to start the raffle, step 2 is to name the raffle
//once a host starts and names the raffle, the raffle is set to be active
// when the raffle is closed (not active), then host can generate winner
// after the winner is generated, then host can transfer funds to winner

//CODE
//importing React and useState in order to use React Hooks
import React from 'react';
import { useState } from 'react';

//adding host pages
import AddRaffleName from './host/AddRaffleName';
import NewRaffleAddress from './host/NewRaffleAddress';
import Landing from './host/Landing';
import GenerateWinner from './host/GenerateWinner';
import SendWinnings from './host/SendWinnings';
import WinningsConfirmation from './host/WinningsConfirmation';

const HostTemplate = () => {
	//INITIAL STATES
	//raffleStart checks if host completed both steps: starting and naming the raffle
	const [ raffleStart, setRaffleStart ] = useState(0);
	const [ raffleName, setRaffleName ] = useState();
	const [ totalTickets, setTotalTickets ] = useState(0);
	//once host completes both steps to start, then raffleActive sets to open (true)
	const [ raffleActive, setRaffleActive ] = useState(false);
	const [ raffleId, setRaffleId ] = useState(0);
	const [ randomString, setRandomString ] = useState();
	//randomWinner is 0 since winner is not generated yet
	const [ randomWinner, setRandomWinner ] = useState(0);
	//winningsTranfer is false since no winnings have been transferred yet
	const [ winningsTransfer, setWinningsTransfer ] = useState(false);

	//FUNCTIONS
	// when host clicks to start the raffle, this sets state to step 2 for the host to name the raffle
	const changeRaffleStart = () => {
		setRaffleStart(1);
	};

	//this tracks the name of the raffle in the input bar
	const handleChangeRaffleName = (e) => {
		setRaffleName(e.target.value);
	};

	//this tracks the number of tickets entered in the input bar
	const handleChangeTotalTickets = (e) => {
		setTotalTickets(e.target.value);
	};

	//this function sets the raffle to be active
	const changeAgainRaffleStart = () => {
		setRaffleStart(2);
		setRaffleActive(true);
	};

	// this closes the raffle
	const changeRaffleActive = () => {
		setRaffleActive(false);
	};

	//this tracks the raffleID entered in the input bar to generate a winner
	const handleChangeRaffleId = (e) => {
		setRaffleId(e.target.value);
	};

	//this tracks the random string the host has entered in the input bar to generate a winner
	const handleChangeRandomString = (e) => {
		setRandomString(e.target.value);
	};

	// this generates a random winner
	const generateRandomWinner = () => {
		setRandomWinner(1234);
	};

	// this transfers the winnings
	const transferWinnings = () => {
		setWinningsTransfer(true);
	};

	let page;
	//if the host selects start, then it goes to next page where host names the raffle (step 2)
	if (raffleStart === 1 && raffleActive === false && randomWinner === 0 && winningsTransfer === false) {
		page = (
			<AddRaffleName
				name={raffleName}
				onInput={handleChangeRaffleName}
				tickets={totalTickets}
				onChange={handleChangeTotalTickets}
				onClick={changeAgainRaffleStart}
			/>
		);
		// once host names the raffle, the raffle is set to active and provides a QR code for participants to transfer funds to join
	} else if (raffleStart === 2 && raffleActive === true && randomWinner === 0 && winningsTransfer === false) {
		page = <NewRaffleAddress name={raffleName} onClick={changeRaffleActive} />;
		// to generate the winner, host must end the raffle
	} else if (raffleStart === 2 && raffleActive === false && randomWinner === 0 && winningsTransfer === false) {
		page = (
			<GenerateWinner
				name={raffleName}
				onClick={generateRandomWinner}
				randomString={randomString}
				onInput={handleChangeRandomString}
				raffleId={raffleId}
				onChange={handleChangeRaffleId}
			/>
		);
		//to send winnings, the raffle must be closed and the randomWinner state must have an address
	} else if (raffleStart === 2 && raffleActive === false && randomWinner !== 0 && winningsTransfer === false) {
		page = <SendWinnings name={raffleName} value={randomWinner} onClick={transferWinnings} />;
		// once winnings are transferred, host is sent to a confirmation page
	} else if (raffleStart === 2 && raffleActive === false && randomWinner !== 0 && winningsTransfer === true) {
		page = <WinningsConfirmation name={raffleName} value={randomWinner} />;
		// if none of the states have been changed (aka at initial state), app directs to landing page
	} else {
		page = <Landing onClick={changeRaffleStart} />;
	}

	return <div>{page}</div>;
};

export default HostTemplate;
