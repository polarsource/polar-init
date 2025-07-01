import { StatusMessage } from "@inkjs/ui";
import { Box, Text } from "ink";
import React from "react";

interface Props {
	message: string;
	variant?: "info" | "success" | "error" | "warning";
}

export function SuccessMessage({ message, variant = "success" }: Props) {
	return (
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant={variant}>
				<Text>{message}</Text>
			</StatusMessage>
		</Box>
	);
}
