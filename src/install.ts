import spawn from "cross-spawn";
import {getPkgManager} from "next/dist/lib/helpers/get-pkg-manager.js";

/**
 * Spawn a package manager installation with either npm, pnpm, or yarn.
 */
const install = async (
	root: string,
	dependencies: string[],
	packageManager: "npm" | "pnpm" | "yarn",
): Promise<void> => {
	let args: string[] = [];

	if (dependencies.length > 0) {
		if (packageManager === "yarn") {
			args = ["add", "--exact"];
		} else if (packageManager === "pnpm") {
			args = ["add", "--save-exact"];
		} else {
			// Npm
			args = ["install", "--save-exact"];
		}

		args.push(...dependencies);
	} else {
		args = ["install"]; // Npm, pnpm, and yarn all support `install`
	}

	return new Promise((resolve, reject) => {
		/**
		 * Spawn the installation process.
		 */
		const child = spawn(packageManager, args, {
			cwd: root,
			env: {
				...process.env,
				ADBLOCK: "1",
				// We set NODE_ENV to development as pnpm skips dev
				// dependencies when production
				NODE_ENV: "development",
			},
		});

		child.on("close", (code: number) => {
			if (code !== 0) {
				reject({command: `${packageManager} ${args.join(" ")}`});
				return;
			}

			resolve();
		});
	});
};

export const installDependencies = async (dependencies: string[]) => {
	await install(process.cwd(), dependencies, getPkgManager(process.cwd()));
};
