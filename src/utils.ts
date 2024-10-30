import fs from "node:fs";
import path from "node:path";

export const isNextDirectory = (directory: string = process.cwd()): boolean => {
	const nextIndicators = ["next.config.js", "next.config.mjs", "next.config.ts", "app"];

	return nextIndicators.some((indicator) =>
		fs.existsSync(path.join(directory, indicator)),
	);
};

export const isNuxtDirectory = (directory: string = process.cwd()): boolean => {
	const nuxtIndicators = ["nuxt.config.js", "nuxt.config.mjs", "nuxt.config.ts", "server", "app/pages"];

	return nuxtIndicators.some((indicator) =>
		fs.existsSync(path.join(directory, indicator)),
	);
};
