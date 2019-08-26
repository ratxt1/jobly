import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./NavBar.css";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    const navLinks = (this.props.currUser !== null)
      ? <nav className="NavBar">
        <NavLink exact to="/">Jobly</NavLink>
        <NavLink exact to="/companies">Companies</NavLink>
        <NavLink exact to="/jobs">Jobs</NavLink>
        <NavLink exact to="/profile">Profile</NavLink>
        <NavLink exact to="/applications">My Applications</NavLink>
        <Link to="/" onClick={this.logout}>Logout</Link>
      </nav>
      : <nav className="NavBar">
        <NavLink exact to="/">Jobly</NavLink>
        <NavLink exact to="/login">Login</NavLink>
      </nav>

    return (navLinks)
  }
}

export default NavBar;