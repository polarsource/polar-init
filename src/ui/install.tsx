import { Spinner } from "@inkjs/ui";
import { render } from "ink";
import React from "react";

export const installMessage = async (promise: Promise<void>) => {
	const { unmount, waitUntilExit } = render(
		<Spinner label="Installing dependencies..." />,
	);

	promise.then(() => {
		unmount();
	});

	await waitUntilExit();
};
