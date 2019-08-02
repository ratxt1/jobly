import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import toJson from "enzyme-to-json";
import Company from "./Company";

let wrapper;


it("renders without crashing", function() {
    shallow(<Company />);
  });
  
// snapshot test
it("matches snapshot", function() {
    let wrapper = shallow(<Company />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

it("runs componentDidMount", function(){
    const mockComponentDidMount = jest.spyOn(
        Company.prototype,
        "componentDidMount"
    )
    wrapper = mount(<Company />);
    expect(mockComponentDidMount).toHaveBeenCalled();
})