// import React from "react";
// import { shallow, configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import NavigationItems from "./NavigationItems";
// import NavigationItem from "../NavigationItem/NavigationItem";

// configure({ adapter: new Adapter() });

// describe("<NavigationItems />", () => {
//   it("should render two <NavigationItem /> elements if not authenticated", () => {
//     const wrapper = shallow(<NavigationItems />);
//     console.log(wrapper);
//     expect(wrapper.find(NavigationItem)).toHaveLength(2);
//   });
// });

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import NavigationItems from "./NavigationItems";

const MockNavigationItems = ({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      <NavigationItems isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

describe("<NavigationItems />", () => {
  it("should render two <NavigationItem /> elements if not authenticated ", async () => {
    render(<MockNavigationItems isAuthenticated={false} />);

    const navItems = screen.getAllByTestId("item");
    expect(navItems.length).toBe(2);
  });
});
