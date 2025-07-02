import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
	accessToken: process.env.POLAR_ACCESS_TOKEN!,
	getCustomerId: (request) => "", // Fuction to resolve a Polar Customer ID
	server: process.env.POLAR_SERVER!,
});
