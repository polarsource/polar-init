import fs from "node:fs";
import path from "node:path";

export type Framework = "next" | "nuxt";

const resolveAppDirectory = () => {
	const workingDirectory = process.cwd();

	// find the app directory which can be either app or src/app
	const appPath = path.join(workingDirectory, "app");
	const srcAppPath = path.join(workingDirectory, "src", "app");

	if (fs.existsSync(appPath)) {
		return appPath;
	}

	if (fs.existsSync(srcAppPath)) {
		return srcAppPath;
	}

	throw new Error(
		'App directory not found. Expected either "app" or "src/app" directory.',
	);
};

const copyTemplate = async (
	framework: Framework,
	templatePath: string,
	targetPath = resolveAppDirectory(),
	isFile = false,
) => {
	const cliDirectory = import.meta.dirname;

	const templateDirectory = path.join(
		cliDirectory,
		"templates",
		framework,
		templatePath,
	);

	if (isFile) {
		fs.copyFileSync(templateDirectory, path.join(targetPath, templatePath));
	} else {
		fs.cpSync(templateDirectory, path.join(targetPath, templatePath), {
			recursive: true,
		});
	}
};

export const copyCheckoutTemplate = async (framework: Framework) => {
	switch (framework) {
		case "next":
			copyTemplate(framework, "checkout");
			break;
	}
};

export const copyPortalTemplate = async (framework: Framework) => {
	switch (framework) {
		case "next":
			copyTemplate(framework, "portal");
			break;
	}
};

export const copyWebhooksTemplate = async (framework: Framework) => {
	switch (framework) {
		case "next":
			copyTemplate(framework, "api");
			break;
	}
};
