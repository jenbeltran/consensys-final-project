//importing React and useState in order to use React Hooks
import React from 'react';

const WinningsConfirmation = (props) => {
	return (
		<div>
			<h1>Thanks for hosting!</h1>
			<h3>If you have notified {props.value}, then they should receive their winnings soon</h3>
			<p>{props.name} is officially over!</p>
		</div>
	);
};

export default WinningsConfirmation;
