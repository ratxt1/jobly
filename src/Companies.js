import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
// import './Companies.css';


class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companiesData: [],
            loading: true
        }
        // TODO: bind function that sets state to filtered companies
    }

    async componentDidMount() {
        let companiesData = await JoblyApi.getCompanies()
        this.setState({
            companiesData: companiesData,
            loading: false
        })
    }



    render() {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
            );
        }

        let companies = this.state.companiesData.map(c => <CompanyCard key={c.handle} {...c}/>);

        return (
            <div className="Companies">
                {/* <SearchBar ={this.___}/> */}
                { companies }
            </div>
        )
    }
}

export default Companies;

/** Companies
 * - state {
 *  companies = [];
 * }
 *
 * - method to search for companies
 * method(filteredCompanies){
 * this.setState({
 * companies = filteredCompanies})
 * }
 *
 * render
 * <SearchBar getFilteredCompanies={this.search} />
 * this.state.companies.map(c => <Card >)
 *
 *
 */

/** SearchBar (form)
 * constructor
 * state = input
 * this.handleChange.bind(this)
 * this.handleSubmit.bind(this)
 *
 * handleChange
 * handleSubmit
 * - invokes prop function, which triggers function call in parent and sets state, renders, etc.
 * - reset form
 *
 *
 *
 */