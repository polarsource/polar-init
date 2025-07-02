import {StatusMessage} from "@inkjs/ui";
import {Box, render, Text} from "ink";

export const successMessage = () => {
	render(
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant="success">
				<Text>Polar was successfully initialized!</Text>
			</StatusMessage>
		</Box>,
	);
};
