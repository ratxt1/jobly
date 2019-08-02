import React, { Component } from 'react';
import { throws } from 'assert';
import JoblyApi from './JoblyApi';
// import './Profile.css';

/** given currUser as prop
 * username, first_name, last_name, email, photo_url
 */



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.currUser.first_name,
      last_name: this.props.currUser.last_name,
      email: this.props.currUser.email,
      photo_url: this.props.currUser.photo_url,
      password: "",
      messageField: "",
      errors: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedDataObj = {...this.state, username: this.props.currUser.username}
      let updatedUser = await JoblyApi.updateUserInfo(updatedDataObj);
      this.props.updateCurrUser(updatedUser)
      this.setState({
        messageField: "User succesfully updated",
        password: '',
        errors: false
      });
    } catch(err) {
      this.setState({
        messageField: err[0],
        password: '',
        errors: true
      })
    }
  }


  render() {
    let { first_name, last_name, email, photo_url } = this.state

    return (
      <div className="Profile row mt-5">
        <div className="col-8 offset-2">
          <h2>Profile</h2>
          <form onSubmit={this.handleSubmit} className="card p-3 bg-light">
            <div className="form-group">
              <label htmlFor="username"></label>
              <p className="text-left"><b>Username</b></p>
              <p className="text-left">{this.props.currUser.username}</p>
            </div>
            <div className="form-group">
              <label htmlFor="first_name"></label>
              <p className="text-left"><b>First Name</b></p>
              <input
                id="first_name"
                onChange={this.handleChange}
                name="first_name"
                value={first_name}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name"></label>
              <p className="text-left"><b>Last Name</b></p>
              <input
                id="last_name"
                onChange={this.handleChange}
                name="last_name"
                value={last_name}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"></label>
              <p className="text-left"><b>Email</b></p>
              <input
                id="email"
                onChange={this.handleChange}
                name="email"
                value={email}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo_url"></label>
              <p className="text-left"><b>Photo URL</b></p>
              <input
                id="photo_url"
                onChange={this.handleChange}
                name="photo_url"
                value={photo_url}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <p className="text-left"><b>Re-enter Password</b></p>
              <input
                id="password"
                onChange={this.handleChange}
                name="password"
                className="form-control"
                required
                type="password"
              />
            </div>
            {(this.state.messageField) 
              ?
                <div className={(this.state.errors ? "alert alert-danger": "alert alert-success")} role="alert">
                  {this.state.messageField}
                </div>
              : null
            }
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Profile;

/** Edit form
 * - onSubmit
 *  - if password not correct => error message
 *  - if correct, make API call to patch user
 *
 * if (this.state.messageField) --> show success or error message
 *
 *
 * TODO
 * - JoblyAPI, create method to call PATCH /user/username
 * - updateUserInfo(username, updatedDataObj)
 * where updatedDataObj = this.state : first_name, last_name, email, photo_url
 *
 */