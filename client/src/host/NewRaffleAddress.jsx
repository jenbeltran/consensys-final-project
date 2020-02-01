import React from 'react';
import { Button } from 'rimble-ui';

const NewRaffleAddress = (props) => {
	return (
		<div>
			<h1>New Raffle Created!</h1>
			<h1>{props.name}</h1>
			<h3>You can now register participants under this raffle number:</h3>
			<h1>1</h1>
			<br />
			<Button onClick={props.onClick}>End Raffle</Button>
		</div>
	);
};

export default NewRaffleAddress;
