import prompts from "prompts";

export const templatePrompt = async () => {
	const { templates } = await prompts({
		type: "multiselect",
		name: "templates",
		message: "Polar Features",
		instructions: false,
		choices: [
			{ title: "Checkout Route", value: "checkout", selected: true },
			{ title: "Portal Route", value: "portal", selected: true },
			{ title: "Webhook Handler", value: "webhooks", selected: true },
		],
	});

	return templates;
};
