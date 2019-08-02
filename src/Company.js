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
    this.updateJobStatusForUser = this.updateJobStatusForUser.bind(this)
    this.applyToJob = this.applyToJob.bind(this)
  }

  async componentDidMount() {
    try {
      let companyData = await JoblyApi.getCompany(this.props.companyName)
      let currUserJobIds = this.props.currUser.jobs.map(job => job.id)
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

  async applyToJob(id) {
    let appliedJobStatus = await JoblyApi.applyToJob(id, "applied");
    this.setState(st => ({
      companyData: {...st.companyData, jobs: st.companyData.jobs.map(function (job) {
          return job.id === +id
            ? { ...job, state: appliedJobStatus }
            : job
        })
      }
    }))
  }

  updateJobStatusForUser(companyData) {
    let currUserJobIds = this.props.currUser.jobs.map(job => job.id)
    let updatedCompanyData = companyData.jobs.map(job => {
      return currUserJobIds.includes(job.id)
        ? { ...job, state: "applied" }
        : job
    })
    return updatedCompanyData
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
