import React, { Component } from 'react';
import './Company.css';
import JoblyApi from './JoblyApi'
import JobCard from './JobCard'


class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyData: {},
      loading: true
    }
    this.applyToJob = this.applyToJob.bind(this)
  }

  /** update job application statuses for current user */
  async componentDidMount() {
    try {
      let companyData = await JoblyApi.getCompany(this.props.companyName)
      // get ids for jobs that curr user has applied for
      let currUserJobIds = this.props.currUser.jobs.map(job => job.id);
      // update application statuses for those jobs 
      companyData.jobs = companyData.jobs.map(job => {
        return currUserJobIds.includes(job.id)
          ? { ...job, state: "applied" }
          : job
      })
      this.setState({
        companyData,
        loading: false
      })
    } catch (err) {
      console.error("We got an error: ", err);
    }

  }

  /** given job id, make API call to apply to job & set state
   * NOTE: passed down to JobCard as a prop
   */
  async applyToJob(id) {
    let appliedJobStatus = await JoblyApi.applyToJob(id, "applied");
    this.setState(st => ({
      companyData: {
        ...st.companyData, 
        jobs: st.companyData.jobs.map(function (job) {
          return job.id === +id
            ? { ...job, state: appliedJobStatus }
            : job
        })
      }
    }))
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      );
    }

    let { name, description, jobs } = this.state.companyData;

    let companyJobs = jobs.map(j => <JobCard
      key={j.id}
      id={j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      state={j.state}
      apply={this.applyToJob}
    />);

    return (
      <div className="Company row">
        <div className="col-8 offset-2">
          <h2>{name}</h2>
          <p>{description}</p>
          <div className="CardList">
            {companyJobs}
          </div>
        </div>
      </div>
    )
  }
}

export default Company;
