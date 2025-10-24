import {StatusMessage} from '@inkjs/ui';
import {Box, Text, render} from 'ink';
import React from 'react';

export const successMessage = () => {
	render(
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant="success">
				<Text>Polar was successfully initialized!</Text>
			</StatusMessage>
		</Box>,
	);
};
