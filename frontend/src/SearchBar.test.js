import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import toJson from "enzyme-to-json";
import SearchBar from "./SearchBar";

it("renders without crashing", function() {
    shallow(<SearchBar />);
  });
  
// snapshot test
it("matches snapshot", function() {
    let wrapper = shallow(<SearchBar />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

it("allows for changes in height, width, background color", function() {
    let wrapper = mount(<SearchBar/>);

    const heightInput = wrapper.find("#searchTerm");
    heightInput.instance().value = "test";
    heightInput.simulate("change");
  
    expect(wrapper.state().searchTerm).toEqual("test");

});
  
// when this form is submitted, we expect that a function is fun
// we can then expect that the state changes once we fire a "change" event
it("runs a mocked fn on submit", function() {
    const submitFn = jest.fn();
    let wrapper = mount(<SearchBar search={submitFn} />);
    
    const form = wrapper.find("form");
  
    form.simulate("submit");
  
    expect(submitFn).toHaveBeenCalled();
  
    // let's go and add some inputs and expect the state to reset on submit
    const heightInput = wrapper.find("#searchTerm");
    heightInput.instance().value = "test";
    heightInput.simulate("change");
  
    form.simulate("submit");
  
    // after submit, we expect the state to reset
    expect(wrapper.state()).toEqual({searchTerm: ''});
});
  