import React, { Component } from 'react';
import './Company.css';
import JoblyApi from './JoblyApi'
import JobCard from './JobCard'
import SearchBar from './SearchBar';

const ERROR_STATE = {
  errorMessage: "Something went wrong!",
  loading: false
};

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      loading: true,
      errorMessage: ""
    }
    this.searchJobs = this.searchJobs.bind(this);
  }

  async componentDidMount() {
    try {
      let jobs = await JoblyApi.getJobs()
      this.setState({
        jobs,
        loading: false
      })
    } catch (err) {
      this.setState(ERROR_STATE);
    }

  }

  async searchJobs(searchTerm) {
    let jobs = await JoblyApi.getFilteredJobs(searchTerm)
    this.setState({ jobs })
  }


  render() {

    const allJobs = this.state.jobs.map(j => <JobCard
      key={j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
    />);

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

