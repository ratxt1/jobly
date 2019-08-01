import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import CompanyCard from "./CompanyCard";

let wrapper;

let c = {
    handle: "test-a",
    name: "test-a",
    description: "Test a",
    logo_url:''
};

it("renders without crashing", function() {
    shallow(<CompanyCard key={c.handle} {...c} />);
  });
  
// snapshot test
it("matches snapshot", function() {
    wrapper = shallow(<CompanyCard key={c.handle} {...c}/>);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});
