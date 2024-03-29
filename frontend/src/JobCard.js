import React, { Component } from 'react';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /** NOTE: this.props.apply is a function passed down from either
   * Company or Job, which makes an API call and sets state */
  handleClick(evt) {
    this.props.apply(evt.target.id);
  }
  
  // COMMENTED OUT - not working :(
  //  handleButtonClick(evt) {
  //   if (this.props.state === null){
  //     this.props.handleClick(evt.target.id, "apply");
  //   } else {
  //     this.props.handleClick(evt.target.id, "unapply");
  //   }
  // }

  render() {
    let { id, title, salary, equity, state } = this.props;
    let buttonText = (!state) ? "APPLY" : "APPLIED"

    return (
      <div className="card shadow-sm bg-white mx-auto mb-2">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Salary: {salary}</p>
          <p className="card-text">Equity: {equity}</p>
          <button
            id={id}
            className="btn btn-danger"
            disabled={state}
            onClick={this.handleClick}>
            {buttonText}
          </button>
        </div>
      </div>
    )
  }
}

export default JobCard;


