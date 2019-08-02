import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import JobCard from "./JobCard";

let wrapper;

let j = {
    id: 1,
    title: "test-job",
    salary: 100, 
    equity: 0.5
};

it("renders without crashing", function() {
    shallow(<JobCard key={j.id} {...j}/>);
  });
  
// snapshot test
it("matches snapshot", function() {
    wrapper = shallow(<JobCard key={j.id} {...j}/>);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

