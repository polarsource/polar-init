import {
	validateEvent,
	WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
	const { polarWebhookSecret } = useRuntimeConfig(event);

	const requestBody = await readBody(event);

	const webhookHeaders = {
		"webhook-id": getHeader(event, "webhook-id") ?? "",
		"webhook-timestamp": getHeader(event, "webhook-timestamp") ?? "",
		"webhook-signature": getHeader(event, "webhook-signature") ?? "",
	};

	let webhookPayload: ReturnType<typeof validateEvent>;
	try {
		webhookPayload = validateEvent(
			requestBody,
			webhookHeaders,
			process.env.POLAR_WEBHOOK_SECRET ?? "",
		);
	} catch (error) {
		if (error instanceof WebhookVerificationError) {
			setResponseStatus(event, 403);
			return {};
		}
		throw error;
	}

	console.log("Incoming Webhook", webhookPayload.type);

	// Handle the event
	switch (webhookPayload.type) {
		// Checkout has been created
		case "checkout.created":
			break;

		// Checkout has been updated - this will be triggered when checkout status goes from confirmed -> succeeded
		case "checkout.updated":
			break;

		// Subscription has been created
		case "subscription.created":
			break;

		// A catch-all case to handle all subscription webhook events
		case "subscription.updated":
			break;

		// Subscription has been activated
		case "subscription.active":
			break;

		// Subscription has been revoked/period has ended with no renewal
		case "subscription.revoked":
			break;

		// Subscription has been explicitly canceled by the user
		case "subscription.canceled":
			break;

		default:
			console.log(`Unhandled event type ${webhookPayload.type}`);
	}

	return { received: true };
});
