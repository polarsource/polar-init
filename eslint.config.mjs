import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import xoReact from 'eslint-config-xo-react';

const eslintConfig = [
	...nextCoreWebVitals,
	...nextTypescript,
	...xoReact,
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],
	},
	{
		rules: {
			'react/prop-types': 'off',
			'n/prefer-global/process': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/switch-exhaustiveness-check': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-process-exit': 'off',
			'promise/prefer-await-to-then': 'off',
			'no-await-in-loop': 'off',
			'new-cap': 'off',
			'import-x/no-unassigned-import': 'off',
		},
	},
];

export default eslintConfig;
