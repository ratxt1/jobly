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
    this.applyToJob = this.applyToJob.bind(this);
    // COMMENTED OUT - not working
    //this.toggleJobApplicationStatus = this.toggleJobApplicationStatus.bind(this);
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

  /** given search term, make API call to search for jobs & set state
   * NOTE: passed down to SearchBar as a prop
   */
  async searchJobs(searchTerm) {
    let jobs = await JoblyApi.getFilteredJobs(searchTerm);
    this.setState({ jobs })
  }

  /** given job id, make API call to apply to job & set state
   * NOTE: passed down to JobCard as a prop
   */
  async applyToJob(id){
    let appliedJobStatus = await JoblyApi.applyToJob(id, "applied");
    this.setState(st => ({
      jobs: st.jobs.map(function(job){
        return job.id === +id
          ? {...job, state: appliedJobStatus}
          : job
      })
    }))
  }

  // COMMENTED OUT - JoblyApi.unapplyToJob not working :(
    
  // async toggleJobApplicationStatus(id, action){
  //   let jobStatus = (action === "apply")
  //     ? await JoblyApi.applyToJob(id, "applied")
  //     : await JoblyApi.unapplyToJob(id)

  //   this.setState(st => ({
  //     jobs: st.jobs.map(function(job){
  //       return job.id === +id
  //         ? {...job, state: jobStatus}
  //         : job
  //     })
  //   }))
  // }

  render() {
    const allJobs = this.state.jobs.map(j => <JobCard
      key={j.id}
      id = {j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      state = {j.state}
      // COMMENTED OUT - JoblyApi.unapplyToJob not working
      //handleClick = {this.toggleJobApplicationStatus}
      apply = {this.applyToJob}
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

