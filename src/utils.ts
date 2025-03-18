import fs from "node:fs";
import path from "node:path";

export const isNextDirectory = (directory: string = process.cwd()): boolean => {
	const nextIndicators = [
		"next.config.js",
		"next.config.mjs",
		"next.config.ts",
	];

	return nextIndicators.some((indicator) =>
		fs.existsSync(path.join(directory, indicator)),
	);
};
