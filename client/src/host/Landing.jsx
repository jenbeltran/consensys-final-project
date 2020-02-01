//importing React and useState in order to use React Hooks
import React from 'react';
import { Button } from 'rimble-ui';

const Landing = (props) => {
	return (
		<div>
			<Button.Text onClick={props.onClick}>Start New Raffle</Button.Text>
		</div>
	);
};

export default Landing;
