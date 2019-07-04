import React from "react";
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import HelloStarWars from "../src/HelloStarWarsHooks";
import useFetch from "../src/useFetch";

//const mockFetch = jest.fn();
//jest.mock("../src/useFetch", () => () => mockFetch());

describe("HelloStarWarsHooks", () => {

	it("Renders with a place holder", () => {
		// Render our component
		const { asFragment } = render(<HelloStarWars id="1" />);

		expect(asFragment()).toMatchSnapshot();
	});

	describe("ComponentDidMount", () => {
		
		beforeEach(() => {
			fetch.resetMocks();
		});

		it("Obtains result and sets data correctly", async () => {
			let result;

			fetch.mockResponseOnce(JSON.stringify({ name: 'Jedi Master' }));

			// Render our component within an act to flush the useFetch
			act(() => {
				const { asFragment } = render(<HelloStarWars id="1" />);
				result = asFragment();
			});

			expect(result).toMatchSnapshot();
		});

		it("Handles an error in the web request correctly", async () => {
			let result;

			fetch.mockReject(new Error("Invalid ID"));

			// Render our component within an act to flush the useFetch
			act(() => {
				const { asFragment } = render(<HelloStarWars id="foobar" />);
				result = asFragment();
			});
			
			expect(result).toMatchSnapshot();
		});
	});
});