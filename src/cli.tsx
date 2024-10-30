import { Polar } from "@polar-sh/sdk";
import meow from "meow";
import { installDependencies } from "./install.js";
import { login } from "./oauth.js";
import { resolveOrganization } from "./organization.js";
import { resolvePackageName } from "./package.js";
import { createProduct } from "./product.js";
import { productPrompt } from "./prompts/product.js";
import { templatePrompt } from "./prompts/template.js";
import {
	copyCheckoutTemplate,
	copyPolarClientTemplate,
	copyProductsTemplate,
	copyWebhooksTemplate,
} from "./template.js";
import { authenticationDisclaimer } from "./ui/authentication.js";
import { installDisclaimer } from "./ui/install.js";
import { precheckDisclaimer } from "./ui/precheck.js";
import { environmentDisclaimer } from "./ui/environment.js";
import { appendEnvironmentVariables } from "./env.js";
import { Box, render, Text } from "ink";
import { StatusMessage } from "@inkjs/ui";
import Link from 'ink-link'
import React from "react";
import { benefitPrompt } from "./prompts/benefit.js";
import { isNuxtDirectory } from "./utils.js";

process.on('uncaughtException', (error) => {
	console.error(error);
	process.exit(1);
});

process.on('unhandledRejection', (error) => {
	console.error(error);
	process.exit(1);
});

const cli = meow(
	`
	Usage
	  $ polar-init

	Options
	  --skip-precheck  Skips the Next.js or NuxtJS project check
	  --skip-template  Skips the template prompt
`,
	{
		importMeta: import.meta,
		flags: {
			skipPrecheck: {
				type: "boolean",
				default: false,
			},
			skipTemplate: {
				type: "boolean",
				default: false,
			},
		},
	},
);

(async () => {
	if (!cli.flags.skipPrecheck) {
		await precheckDisclaimer();
	}

	const product = await productPrompt();
	const benefit = await benefitPrompt();

	await authenticationDisclaimer();
	const code = await login();

	const api = new Polar({
		accessToken: code,
		server: "sandbox",
	});

	const packageName = await resolvePackageName();
	const organization = await resolveOrganization(api, packageName);

	await createProduct(api, organization, product, benefit);


	if (!cli.flags.skipTemplate) {
		const templates = await templatePrompt();
		const isNuxt = isNuxtDirectory();

		if (isNuxt) {
			await copyPolarClientTemplate("nuxt");
		} else {
			await copyPolarClientTemplate();
		}

		const shouldCopyCheckout = templates.includes("checkout");
		const shouldCopyWebhooks = templates.includes("webhooks");

		if (shouldCopyCheckout) {
			if (isNuxt) {
				await copyProductsTemplate("nuxt");
				await copyCheckoutTemplate("nuxt");
			} else {
				await copyProductsTemplate();
				await copyCheckoutTemplate();
			}
		}

		if (shouldCopyWebhooks) {
			if (isNuxt) {
				await copyWebhooksTemplate("nuxt");
			} else {
				await copyWebhooksTemplate();
			}
		}

		const baseDependencies = ["@polar-sh/sdk"];
		const webhooksDependencies = ["standardwebhooks"];

		await installDisclaimer(
			installDependencies(
				shouldCopyWebhooks
					? [...baseDependencies, ...webhooksDependencies]
					: baseDependencies,
			),
		);




		// Handle environment variables
		let envVar = {}
		if (isNuxt) {
			envVar = {
				NUXT_POLAR_ORGANIZATION_ID: organization.id,
				NUXT_POLAR_ACCESS_TOKEN: "",
				NUXT_POLAR_WEBHOOK_SECRET: shouldCopyWebhooks ? "" : undefined,
				NUXT_POLAR_SERVER: "sandbox",
			};
		} else {
			envVar = {
				POLAR_ORGANIZATION_ID: organization.id,
				POLAR_ACCESS_TOKEN: "",
				POLAR_WEBHOOK_SECRET: shouldCopyWebhooks ? "" : undefined,
			};
		}
		await environmentDisclaimer(appendEnvironmentVariables({
			...envVar,
		}));
	}

	render(
		<Box flexDirection="column" columnGap={2}>
			<StatusMessage variant="success">
				<Text>Polar was successfully initialized!</Text>
			</StatusMessage>
			<Box flexDirection="column" paddingY={1}>
				<Text>
					Environment: <Text color="yellow">Sandbox</Text> <Text color="gray">(Setup Polar in production when you're ready to launch)</Text>
				</Text>
				<Text>
					Organization: <Text color="blue">{organization.name}</Text>
				</Text>
				<Text>
					Product: <Text color="blue">{product.name}</Text>
				</Text>

				<Text color="magentaBright">{'>'} <Link url="https://sandbox.polar.sh/settings">Create Polar Access Token</Link></Text>
				<Text color="magentaBright">{'>'} <Link url={`https://sandbox.polar.sh/dashboard/${organization.slug}/settings`}>Configure Webhooks</Link></Text>
				<Text color="cyanBright">{'>'} <Link url="https://docs.polar.sh/guides/nextjs">Continue to the Polar Next.js Guide</Link></Text>
			</Box>
		</Box>
	)
})();
