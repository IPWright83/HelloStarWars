import React from "react";
import renderer from 'react-test-renderer';
import Adapter from "enzyme-adapter-react-16";
import enzyme from "enzyme";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils';

import HelloStarWars from "../src/HelloStarWarsHooks";

// using jest-fetch-mock

// Define a function which should allow any promises/macro tasks to complete
const flushMacroTasks = () => new Promise(resolve => setTimeout(resolve, 0));

enzyme.configure({ adapter: new Adapter() });

xdescribe("HelloStarWarsHooks Flushing Attempt", () => {

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

            // Wait for the react hook to complete
            await flushMacroTasks();

            wrapper.update();

            expect(wrapper).toMatchSnapshot();
		});

		xit("Handles an error in the web request correctly", async () => {
            fetch.mockReject(new Error("Invalid ID"));
            
            const wrapper = await mount(<HelloStarWars id="foobar" />);
			const instance = wrapper.instance();

            await flushMacroTasks();

			wrapper.update();
			expect(wrapper).toMatchSnapshot();
		});
	});
});