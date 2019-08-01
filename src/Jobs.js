import React, { Component } from 'react';
import './Company.css';
import JoblyApi from './JoblyApi'
import JobCard from './JobCard'
import SearchBar from './SearchBar';


class Jobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobsData: {},
            loading: true
        }
        this.searchJobs = this.searchJobs.bind(this);
    }

    async componentDidMount() {
        let jobsData = await JoblyApi.getJobs()
        this.setState({
            jobsData: jobsData,
            loading: false
        })
    }

    async searchJobs(searchTerm) {
        let jobsData = await JoblyApi.getFilteredJobs(searchTerm)
        this.setState({
            jobsData: jobsData
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

        let allJobs = this.state.jobsData.map(j => <JobCard key={j.id} {...j} />);

        return (
            <div className="Jobs row">
                <div className="col-8 offset-2">
                    <SearchBar search={this.searchJobs} />
                    <div className="CardList">
                        {allJobs}
                    </div>
                </div>
            </div>     
        )
  }
}

export default Jobs;

