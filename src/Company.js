import React, { Component } from 'react';
import './Company.css';
import JoblyApi from './JoblyApi'
import JobCard from './JobCard'


class Company extends Component{
    constructor(props) {
        super(props)
        this.state = {
            companyData:{},
            loading: true
        }
    }

    async componentDidMount() {
        let companyData = await JoblyApi.getCompany(this.props.companyName)
        this.setState({ 
            companyData: companyData,
            loading: false
        })
    }


    render(){
        if(this.state.loading){
            return (
                <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
            );
    }
    
    let { name, description, jobs } = this.state.companyData; 
    let companyJobs = jobs.map(j => <JobCard key={j.id} {...j}/>);

    return(
      <div className="Company">
        <h2>{ name }</h2>
        <p>{ description }</p>
        <div className="CardList">
            { companyJobs }
        </div>
      </div>      
    )
  }
}

export default Company;
