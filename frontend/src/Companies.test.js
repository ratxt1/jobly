/** TESTING PLAN!
 * 
 * Questions/concerns 
 * - confirm that we should mock API calls 
 * 
 * App
 * - Renders nav bar
 * - LATER: renders correct UI based on if youre logged in vs. not 
 * 
 * Companies
 * - componentDidMount ran correctly (changes state)
 * - renders all companies (snapshot?)
 * - clicking a company shows companies detail 
 *   - check that CompanyCard component has been rendered 
 *   (check wrapper.state.companyData = that comapnys info obj
 * 
 * Company
 *  - componentDidMount ran correctly (setsState with requested companies data)
 * 
 * CompanyCard
 * - shallow/snapshot
 * - uses default image if company does not have an image
 * 
 * JobCard
 *  - shallow/snapshot
 * 
 * SearchBar
 * 
 */

import React from "react";
import { shallow, mount } from "enzyme";
import rrd, { MemoryRouter, BrowserRouter } from 'react-router-dom';
import toJson from "enzyme-to-json";
import Companies from "./Companies";
import App from './App'

let wrapper;


it("renders without crashing", function() {
    wrapper = mount(
        <MemoryRouter>
          <Companies/>
        </MemoryRouter>
    );
});
  
// snapshot test
it("matches snapshot", function() {
    wrapper = mount(
        <MemoryRouter>
          <Companies/>
        </MemoryRouter>
    );
    let companies = wrapper.find(Companies);
    let serialized = toJson(companies);
    expect(serialized).toMatchSnapshot();
});

it("runs componentDidMount", function(){
    const mockComponentDidMount = jest.spyOn(
        Companies.prototype,
        "componentDidMount"
    )
    wrapper = mount(
        <MemoryRouter>
          <Companies/>
        </MemoryRouter>
    );
    expect(mockComponentDidMount).toHaveBeenCalled();
})

it("runs componentDidMount with updated state", async function(){
    // NOTES: in App we've defined BrowserRouter to have routes in it. 
    // When we're testing we need to overwrite what the default BrowserRouter does.
    // In the example below we are returning the App (thats the child)

    // initialEntries brings you to that "route", 
    // if you're mounting App you can use initialEntries to bring you somewhere

    wrapper = mount(
        <MemoryRouter initialEntries={[ '/companies' ]}>
          <Companies/>
        </MemoryRouter>
      );
    
    let companies = wrapper.find(Companies).instance();

    expect(companies.state).toEqual({ companiesData: [], loading: true });

    await companies.componentDidMount();

    expect(companies.state.loading).toEqual(false);
})

