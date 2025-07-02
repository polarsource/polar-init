import {resolve} from "path";
import {render} from "cli-testing-library";
import {expect, test} from "vitest";
import "cli-testing-library/vitest";

test("runs analyzing framework check", async () => {
	const {findByText, debug} = await render(
		"node",
		[resolve(process.cwd(), "./bin/cli.js")],
		{cwd: resolve(process.cwd(), "./example")},
	);

	debug();
	const message = await findByText("Analyzing your framework");
	expect(message).toBeInTheConsole();
});
