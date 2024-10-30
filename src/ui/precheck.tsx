import { Spinner, StatusMessage } from "@inkjs/ui";
import { Text, render } from "ink";
import React from "react";
import { isNextDirectory, isNuxtDirectory } from "../utils.js";
import type { Framework } from "../template.js";

const precheck = async (): Promise<Framework> => {
	const isNuxt = isNuxtDirectory();
	const isNext = isNextDirectory();

	let framework: Framework;

	switch (true) {
		case isNuxt:
			framework = "nuxt";
			break;
		case isNext:
			framework = "next";
			break;
		default: {
			const { unmount, clear, waitUntilExit } = render(
				<StatusMessage variant="error">
					<Text>No valid framework detected</Text>
				</StatusMessage>,
			);

			setTimeout(() => {
				clear();
				unmount();
			}, 1000);

			await waitUntilExit();

			process.exit(1);
		}
	}

	return framework;
};

export const precheckMessage = async () => {
	const { unmount, clear, waitUntilExit } = render(
		<Spinner label="Analyzing your framework..." />,
	);

	setTimeout(() => {
		clear();
		unmount();
	}, 1000);

	await waitUntilExit();

	return await precheck();
};
