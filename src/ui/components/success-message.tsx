import {StatusMessage} from "@inkjs/ui";
import {Box, Text} from "ink";

type Props = {
	readonly message: string;
	readonly variant?: "info" | "success" | "error" | "warning";
};

export function SuccessMessage({message, variant = "success"}: Props) {
	return (
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant={variant}>
				<Text>{message}</Text>
			</StatusMessage>
		</Box>
	);
}
