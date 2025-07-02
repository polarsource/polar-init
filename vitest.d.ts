import 'vitest'

interface CustomMatchers<R = unknown> {
	toBeInTheConsole: () => R
}

declare module 'vitest' {
	interface Matchers<T = any> extends CustomMatchers<T> {}
}
