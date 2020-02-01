//importing React and useState in order to use React Hooks
import React from 'react';

//using Rimble UI for front-end styled components
import { Form, Input, Button } from 'rimble-ui';

const AddRaffleName = (props) => {
	return (
		<div>
			<h1>Raffle Details</h1>
			<h3>Enter a raffle name and the number of tickets you want to sell</h3>
			<Form>
				<Input
					type="text"
					onInput={props.onInput}
					name={props.name}
					required={true}
					placeholder="Raffle Name"
				/>
				<Input
					type="number"
					onChange={props.onChange}
					tickets={props.tickets}
					required={true}
					placeholder="Number of Tickets"
				/>
			</Form>
			<Button onClick={props.onClick}>Submit</Button>
		</div>
	);
};

export default AddRaffleName;
