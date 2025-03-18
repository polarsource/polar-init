import { StatusMessage } from "@inkjs/ui";
import { Box, Text, render } from "ink";
import React from "react";

export const successMessage = (server: "sandbox" | "production") => {
	render(
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant="success">
				<Text>Polar was successfully initialized!</Text>
			</StatusMessage>
			<Box flexDirection="column" paddingY={1}>
				<Text>
					Environment: <Text color="yellow">{server}</Text>{" "}
				</Text>
			</Box>
		</Box>,
	);
};
