import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
// import './Companies.css';


class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companiesData: [],
            loading: true
        }
        this.searchCompanies = this.searchCompanies.bind(this)
    }

    async componentDidMount() {
        try {
            let companiesData = await JoblyApi.getCompanies()
            this.setState({
                companiesData: companiesData,
                loading: false
            })
        } catch(err) {
            console.log("we got an error", err)
        }
        
    }

    async searchCompanies(searchTerm) {
        try {
            let companiesData = await JoblyApi.getFilteredCompanies(searchTerm)
            this.setState({
                companiesData: companiesData
            })
        } catch(err) {
            console.log("we got an error", err)
        }
        
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
            );
        }

        let companies = this.state.companiesData.map(c => <CompanyCard key={c.handle} {...c} />);

        return (
            <div className="Companies row">
                <div className="col-8 offset-2">
                    <SearchBar search={this.searchCompanies} />
                    {companies}
                </div>
            </div>
        )
    }
}

export default Companies;
