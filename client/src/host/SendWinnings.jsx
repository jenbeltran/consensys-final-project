//importing React and useState in order to use React Hooks
import React from 'react';

//using Rimble UI for front-end styled components
import { Button } from 'rimble-ui';

const SendWinnings = (props) => {
	return (
		<div>
			<h1>{props.name}</h1>
			<h2>The winner is:</h2>
			<h3>{props.value}</h3>
			<p>Please notify the winner to withdraw their proceeds</p>
			<Button onClick={props.onClick}>I have notified winner</Button>
		</div>
	);
};

export default SendWinnings;
