//CODE
//importing React and useState in order to use React Hooks
import React from 'react';
import { useState } from 'react';

//adding participant pages
import PLanding from './participant/PLanding';
import RaffleSearch from './participant/RaffleSearch';
import Register from './participant/Register';
import RegistrationConfirmation from './participant/RegistrationConfirmation';

const PTemplate = () => {
	//changes state if user decides to register for raffle
	const [ raffleRegister, setRaffleRegister ] = useState(0);
	const [ raffleSelected, setRaffleSelected ] = useState(false);
	const [ ticketsBought, setTicketsBought ] = useState(0);

	//FUNCTIONS
	// when participant clicks to register for the raffle, this changes the state and goes to the search raffle page
	const changeRaffleRegister = () => {
		setRaffleRegister(1);
	};

	//after the search, the user must confirm if they want to participate in the raffle
	const changeRaffleSelected = () => {
		setRaffleSelected(true);
	};

	//this function keeps track how many tickets the user selected to buy
	const changeTicketsBought = (e) => {
		setTicketsBought(e.target.value);
	};

	// if the user buys one or more tickets, they are sent to the confirmation page
	const registeredAndBoughtTickets = () => {
		setRaffleRegister(2);
	};

	let page;
	//if the user selects register, then it goes to the search page
	if (raffleRegister === 1 && raffleSelected === false) {
		page = <RaffleSearch onClick={changeRaffleSelected} />;
		//once a user enters the raffle number,
		//it pulls up the search with an imput box for the user to enter number of tickets they want to buy
	} else if (raffleRegister === 1 && raffleSelected === true) {
		page = <Register onChange={changeTicketsBought} value={ticketsBought} onClick={registeredAndBoughtTickets} />;
		//if a user bought one or more tickets and press submit, they are directed to the confirmation page
	} else if (raffleRegister === 2 && raffleSelected === true && ticketsBought >= 1) {
		page = <RegistrationConfirmation />;
	} else {
		page = <PLanding onClick={changeRaffleRegister} />;
	}

	return <div>{page}</div>;
};

export default PTemplate;
