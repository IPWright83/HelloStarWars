import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import enzyme from "enzyme";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import HelloStarWars from "../src/HelloStarWars";

// Uses jest-fetch-mock setup within the setupJest.js file
enzyme.configure({ adapter: new Adapter() });

describe("HelloStarWars", () => {
  it("Renders with a place holder", () => {
    let root;
    // the test renderer has it's own version of act()
    renderer.act(() => {
      root = renderer.create(<HelloStarWars id="1" />);
    });

    expect(root).toMatchSnapshot();
  });

  describe("ComponentDidMount", () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Obtains result and sets data correctly", async () => {
      fetch.mockResponseOnce(JSON.stringify({ name: "Jedi Master" }));

      let wrapper;
      await act(async () => {
        wrapper = mount(<HelloStarWars id="1" />);
      });
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });

    it("Handles an error in the web request correctly", async () => {
      fetch.mockReject(new Error("Invalid ID"));
      let wrapper;
      await act(async () => {
        wrapper = mount(<HelloStarWars id="foobar" />);
      });
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
