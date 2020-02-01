//importing React and useState in order to use React Hooks
import React from 'react';

//using Rimble UI for front-end styled components
import { Form, Input, Button } from 'rimble-ui';

const GenerateWinner = (props) => {
	return (
		<div>
			<h1>Registration Closed</h1>
			<h1>{props.name}</h1>
			<h3>Please wait at least 10 minutes before generating a winner</h3>
			<p>We want to ensure that the final participants have entered</p>
			<Form>
				<p>Enter the Raffle ID number</p>
				<Input
					type="number"
					onChange={props.onChange}
					value={props.raffleId}
					required={true}
					placeholder="Raffle ID number"
				/>
				<p>Enter a word</p>
				<Input
					type="text"
					onInput={props.onChange}
					value={props.randomString}
					required={true}
					placeholder="Enter any word"
				/>
			</Form>
			<Button onClick={props.onClick}>Generate Winner</Button>
		</div>
	);
};

export default GenerateWinner;
