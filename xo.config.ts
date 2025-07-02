import {type FlatXoConfig} from "xo";

const xoConfig: FlatXoConfig = [
	{
		prettier: true,
		semicolon: true,
		react: true,
	},
	{
		ignores: ["bin/**", "example/**", "templates/**"],
	},
	{
		rules: {
			"n/prefer-global/process": ["off"],
			"@typescript-eslint/naming-convention": ["off"],
			"no-await-in-loop": ["off"],
			"unicorn/no-process-exit": ["off"],
			"promise/prefer-await-to-then": ["off"],
			"unicorn/no-array-reduce": ["off"],
			"@typescript-eslint/no-unsafe-return": ["off"],
			"@typescript-eslint/no-unsafe-call": ["off"],
			"@typescript-eslint/prefer-promise-reject-errors": ["off"],
			"@typescript-eslint/no-floating-promises": ["off"],
			"no-warning-comments": ["off"],
			"@typescript-eslint/no-unsafe-assignment": ["off"],
			"unicorn/prefer-top-level-await": ["off"],
			"react/react-in-js": ["off"],
			"react/react-in-jsx-scope": ["off"],
		},
	},
];

export default xoConfig;
