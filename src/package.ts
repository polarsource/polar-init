import fs from 'node:fs/promises';

export const resolvePackageName = async () => {
	const workingDir = process.cwd();

	try {
		const packageJson = await fs.readFile(`${workingDir}/package.json`, 'utf8');

		return JSON.parse(packageJson).name;
	} catch (error) {
		console.error('Could not find package.json in the current directory.');
		throw error;
	}
};
