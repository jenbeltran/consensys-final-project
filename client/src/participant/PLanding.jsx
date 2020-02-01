//importing React and useState in order to use React Hooks
import React from 'react';
import { Button } from 'rimble-ui';

const PLanding = (props) => {
	return (
		<div>
			<Button.Text onClick={props.onClick}>Register for a Raffle</Button.Text>
		</div>
	);
};

export default PLanding;
