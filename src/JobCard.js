import React, { Component } from 'react';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.apply(evt.target.id);
  }

  render() {
    let { id, title, salary, equity, state } = this.props;
    return (
      <div className="card mx-auto mb-1">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Salary: {salary}</p>
          <p className="card-text">Equity: {equity}</p>
          <button
            id={id}
            className="btn btn-danger"
            disabled={state}
            onClick={this.handleClick}>
            { (!state) ? "APPLY" : "APPLIED"}
          </button>
        </div>
      </div>
    )
  }
}

export default JobCard;


