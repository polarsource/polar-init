import {Spinner} from '@inkjs/ui';
import {render} from 'ink';
import React from 'react';

export const environmentMessage = async (promise: Promise<void>) => {
	const {unmount, waitUntilExit} = render(
		<Spinner label="Configuring environment variables..." />,
	);

	promise.then(() => {
		unmount();
	});

	await waitUntilExit();
};
