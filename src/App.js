import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, withRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';
import jwt from 'jsonwebtoken';
import JoblyApi from './JoblyApi'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      loading: true
    };
    this.clearCurrUser = this.clearCurrUser.bind(this);
    this.addCurrUser = this.addCurrUser.bind(this);
    this.updateCurrUser = this.updateCurrUser.bind(this);
  }

  async componentDidMount() {
    let currUser = this.state.currUser
    try {
      let token = window.localStorage.getItem('token');
      let { username } = jwt.decode(token);
      currUser = await JoblyApi.getUserInfo(username);
      // currUser = {username, first_name, last_name, email, jobs[{id, title, company_handle, state}], photo_url}
      this.setState({
        currUser,
        loading: false
      });
    } catch(err) {
      this.setState({
        loading: false
      });
      // this.props.history.push('/login');
    }
  }

  clearCurrUser() {
    window.localStorage.removeItem('token');
    this.setState({ currUser: null });
  }

  async addCurrUser(username) {
    console.log("Add curruser username: ", username)
    try {
      let currUser = await JoblyApi.getUserInfo(username);
      this.setState({
        currUser,
      });
    } catch(err) {
    } 
  }

  updateCurrUser(updatedUser) {
    this.setState({currUser: updatedUser})
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      );
    }
    return (     
      <div className="App">
          <NavBar currUser={this.state.currUser} logoutUser={this.clearCurrUser} />
          <Routes currUser={this.state.currUser} addCurrUser={this.addCurrUser} updateCurrUser={this.updateCurrUser} />
      </div>
    )
  }
}

export default withRouter(App);

/** componentDidMount
 * localStorage.getItem('token')
 *
 * JoblyAPI has
 *
 * token payload has username
 * API call to get /users/username (authenticates, returns users info)
 *
 * LATER - returned info should include the jerbs user has applied to
 */