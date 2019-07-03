import React from "react";
import renderer from 'react-test-renderer';
import Adapter from "enzyme-adapter-react-16";
import enzyme from "enzyme";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils';

import HelloStarWars from "../src/HelloStarWarsHooks";
import useFetch from "../src/useFetch";

const mockFetch = jest.fn();
jest.mock("../src/useFetch", () => () => mockFetch());

enzyme.configure({ adapter: new Adapter() });

describe("HelloStarWarsHooks", () => {

	xit("Renders with a place holder", () => {
		const result = renderer
			.create(<HelloStarWars id="1" />)
			.toJSON();

		expect(result).toMatchSnapshot();
	});

	describe("ComponentDidMount", () => {

		beforeEach(() => {
			fetch.resetMocks();
		});

		it("Obtains result and sets data correctly", async () => {
			const wrapper = await mount(<HelloStarWars id="1" />);
            const instance = wrapper.instance();
            
            mockFetch.mockImplementationOnce(() => Promise.resolve(({ name: "Jedi Master"})));

			wrapper.update();
			expect(wrapper).toMatchSnapshot();
		});

		xit("Handles an error in the web request correctly", async () => {
			const wrapper = await mount(<HelloStarWars id="foobar" />);
			const instance = wrapper.instance();

            mockFetch.mockImplementationOnce(() => Promise.reject("Invalid ID"));

			wrapper.update();
			expect(wrapper).toMatchSnapshot();
		});
	});
});