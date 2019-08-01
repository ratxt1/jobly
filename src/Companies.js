import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import {Redirect} from "react-router-dom"
import SearchBar from './SearchBar';
// import './Companies.css';

const ERROR_STATE = {
    errorMessage: "Something went wrong!",
    loading: false
};


class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            loading: true,
            errorMessage: ""
        }
        this.searchCompanies = this.searchCompanies.bind(this)
    }

    async componentDidMount() {
        try {
            let companies = await JoblyApi.getCompanies()
            this.setState({
                companies,
                loading: false
            })
        } catch(err) {
            this.setState(ERROR_STATE);
        }
        
    }

    async searchCompanies(searchTerm) {
        try {
            let companies = await JoblyApi.getFilteredCompanies(searchTerm)
            this.setState({ companies })
        } catch(err) {
            this.setState(ERROR_STATE);
        }
        
    }

    render() {
        if(this.props.currUser === null){
            return <Redirect to="/login"/>
        }
        const companies = this.state.companies.map(c => <CompanyCard key={c.handle} {...c} />);

        if (this.state.loading) {
            return (
                <div className="loading">
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
            );
        }

        if (this.state.errorMessage) {
            return (
                <p>{this.state.errorMessage}</p>
            )
        }

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
