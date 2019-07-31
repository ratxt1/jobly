import React, { Component } from 'react';

class JobCard extends Component{
    render(){
        let { title, salary, equity } = this.props;
        debugger;
        
        return(
          <div className="card mx-auto mb-1" style={{width: '45rem'}}>
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">Salary: { salary}</p>
                <p className="card-text">Equity: { equity }</p>
            </div>
          </div>      
        )
      }
}

export default JobCard;


// jobData = {
//     id:
//     title:
//     salary:
//     equity:
//     company_handle:
//     date_posted:
// }