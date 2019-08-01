import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './Homepage.css';

class Homepage extends Component{
  render(){
    return(
      <div className="Homepage">
        <h2>Jobly</h2>
        <h5>All the jobs in one, convenient place</h5>
        {(this.props.currUser)
          ? <h3>Welcome back!</h3>
          : <Link to="/login" className="btn btn-primary">Log in</Link>
        }
      </div>      
    )
  }
}

export default Homepage;

