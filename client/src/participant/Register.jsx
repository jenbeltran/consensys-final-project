//importing React and useState in order to use React Hooks
import React from 'react';

//using Rimble UI for front-end styled components
import { Form, Input, Button } from 'rimble-ui';

const Register = (props) => {
	return (
		<div>
			<h1>Registration</h1>
			<h3>The raffle you want to participate in is named ABC, correct?</h3>
			<p>Please enter the amount of tickets you want to buy</p>
			<Form>
				<Input
					type="number"
					onChange={props.onChange}
					value={props.value}
					required={true}
					placeholder="Number of Tickets"
				/>
			</Form>
			<Button type="button" onClick={props.onClick} mr={3}>
				Buy Tickets
			</Button>
			<Button type="button">No, take me back to search</Button>
		</div>
	);
};

export default Register;
