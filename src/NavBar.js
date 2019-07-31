import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";


class NavBar extends Component {
    render() {
        return (
            <nav className="NavBar">
                <NavLink exact to="/">Jobly</NavLink>
                <NavLink exact to="/companies">Companies</NavLink>
                <NavLink exact to="/jobs">Jobs</NavLink>
                <NavLink exact to="/profile">Profile</NavLink>
                <NavLink exact to="/login">Login</NavLink>
            </nav>
        )
    }
}

export default NavBar;