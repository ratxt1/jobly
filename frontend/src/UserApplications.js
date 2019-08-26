import React, { Component } from 'react';
import JobCard from './JobCard'

class UserApplications extends Component {

    render(){
        let appliedJobs = this.props.currUser.jobs.map(j => <JobCard 
            key={j.id}
            id = {j.id}
            title={j.title}
            salary={j.salary}
            equity={j.equity}
            state = {j.state}
           apply = {() => {}}
          />);
        return(
            <div>
                <h2 className="my-4"> Manage Your Applications</h2>
                <div className="row">
                    <div className="col-8 offset-2">
                        {appliedJobs}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserApplications;
