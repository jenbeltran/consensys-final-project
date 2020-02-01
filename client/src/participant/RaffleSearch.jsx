//importing React and useState in order to use React Hooks
import React from 'react';

//using Rimble UI for front-end styled components
import { Form, Input, Button } from 'rimble-ui';

const RaffleSearch = (props) => {
	return (
		<div>
			<h1>Enter a Raffle Number</h1>
			<Form>
				<Input type="text" required={true} placeholder="Raffle Number" />
				<Button type="button" onClick={props.onClick}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default RaffleSearch;
