import React from "react";
import renderer from 'react-test-renderer';
import Adapter from "enzyme-adapter-react-16";
import enzyme from "enzyme";
import { mount } from "enzyme";

import HelloStarWars from "../src/HelloStarWars";

// Uses jest-fetch-mock setup within the setupJest.js file
enzyme.configure({ adapter: new Adapter() });

xdescribe("HelloStarWars", () => {

	it("Renders with a place holder", () => {
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
			fetch.mockResponseOnce(JSON.stringify({ name: 'Jedi Master' }));

			const wrapper = await mount(<HelloStarWars id="1" />);
			const instance = wrapper.instance();
			
			await instance.componentDidMount();

			wrapper.update();
			await Promise.resolve();

			expect(wrapper).toMatchSnapshot();
		});

		it("Handles an error in the web request correctly", async () => {
			const wrapper = await mount(<HelloStarWars id="foobar" />);
			const instance = wrapper.instance();

			fetch.mockReject(new Error("Invalid ID"));
			await instance.componentDidMount();

			wrapper.update();
			expect(wrapper).toMatchSnapshot();
		});
	});
});