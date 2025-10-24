import meow from 'meow';
import {appendEnvironmentVariables} from './env.js';
import {installDependencies} from './install.js';
import {templatePrompt} from './prompts/template.js';
import {
	type Framework,
	copyCheckoutTemplate,
	copyPortalTemplate,
	copyWebhooksTemplate,
} from './template.js';
import {environmentMessage} from './ui/environment.js';
import {installMessage} from './ui/install.js';
import {precheckMessage} from './ui/precheck.js';
import {successMessage} from './ui/success.js';

process.on('uncaughtException', error => {
	console.error(error);
	process.exit(1);
});

process.on('unhandledRejection', error => {
	console.error(error);
	process.exit(1);
});

const cli = meow(
	`
	Usage
	  $ polar-init

	Options
	  --sandbox  Sets the server configuration to sandbox
	  --skip-precheck  Skips the framework check, and fallbacks to Next
`,
	{
		importMeta: import.meta,
		flags: {
			sandbox: {
				type: 'boolean',
				default: false,
			},
			skipPrecheck: {
				type: 'boolean',
				default: false,
			},
		},
	},
);

(async () => {
	let framework: Framework;

	framework = cli.flags.skipPrecheck ? 'next' : await precheckMessage();

	const templates = await templatePrompt();

	const shouldCopyCheckout = templates.includes('checkout');
	const shouldCopyPortal = templates.includes('portal');
	const shouldCopyWebhooks = templates.includes('webhooks');

	if (shouldCopyCheckout) {
		await copyCheckoutTemplate(framework);
	}

	if (shouldCopyPortal) {
		await copyPortalTemplate(framework);
	}

	if (shouldCopyWebhooks) {
		await copyWebhooksTemplate(framework);
	}

	const dependencies = ['@polar-sh/sdk', '@polar-sh/nextjs', 'zod'];

	await installMessage(installDependencies(dependencies));

	let envVar = {};

	switch (framework) {
		case 'next': {
			envVar = {
				POLAR_ACCESS_TOKEN: '',
				POLAR_WEBHOOK_SECRET: shouldCopyWebhooks ? '' : undefined,
				POLAR_SERVER: cli.flags.sandbox
					? "sandbox # Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise"
					: 'production',
			};
			break;
		}
	}

	await environmentMessage(
		appendEnvironmentVariables({
			...envVar,
		}),
	);

	successMessage();
})();
