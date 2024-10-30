import fs from "node:fs";
import path from "node:path";

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
	framework: string,
	templatePath: string,
	targetPath = resolveAppDirectory(),
	isFile = false,
) => {
	const cliDirectory = import.meta.dirname;

	const templateDirectory = path.join(cliDirectory, "templates", framework, templatePath);

	if (isFile) {
		fs.copyFileSync(
			templateDirectory,
			path.join(targetPath, templatePath),
		);
	} else {
		fs.cpSync(templateDirectory, path.join(targetPath, templatePath), { recursive: true });
	}
};

export const copyPolarClientTemplate = async (framework = "next") => {
	if (framework === "nuxt") {
		copyTemplate(framework, path.join("app", "utils"), path.join(resolveAppDirectory(), ".."));
	} else {
		copyTemplate(framework, "polar.ts", path.join(resolveAppDirectory(), ".."), true);
	}
};

export const copyProductsTemplate = async (framework = "next") => {
	if (framework === "nuxt") {
		copyTemplate(framework, path.join("server", "api", "polar", "products"), path.join(resolveAppDirectory(), ".."));
		copyTemplate(framework, path.join("app", "pages", "products"), path.join(resolveAppDirectory(), ".."));
	} else {
		copyTemplate(framework, "products");
	}
};

export const copyCheckoutTemplate = async (framework = "next") => {
	if (framework === "nuxt") {
		copyTemplate(framework, path.join("server", "api", "checkout"), path.join(resolveAppDirectory(), ".."));
		copyTemplate(framework, path.join("app", "pages", "checkout"), path.join(resolveAppDirectory(), ".."));
	} else {
		copyTemplate(framework, "checkout");
	}
};

export const copyWebhooksTemplate = async (framework = "next") => {
	if (framework === "nuxt") {
		copyTemplate(framework, path.join("server", "api", "polar", "webhook"), path.join(resolveAppDirectory(), ".."));
	} else {
		copyTemplate(framework, "api");
	}
};
