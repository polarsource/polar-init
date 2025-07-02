import {test, expect} from "vitest";
import {render} from "ink-testing-library";
import React from "react";
import {SuccessMessage} from "../src/ui/components/success-message.js";

test("render success message", () => {
	const {lastFrame} = render(
		<SuccessMessage message="Woop woop!" variant="success" />,
	);

	expect(lastFrame()).toEqual("✔  Woop woop!");
});
