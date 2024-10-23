import { Spinner } from "@inkjs/ui";
import { render } from "ink";
import React from "react";

export const environmentDisclaimer = async (promise: Promise<void>) => {
    const { unmount, clear, waitUntilExit } = render(
		<Spinner label="Configuring environment variables..." />,
	);

	promise.then(() => {
		clear();
		unmount();
	});

	await waitUntilExit();
};
