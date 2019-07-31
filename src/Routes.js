import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Company from './Company'
import Companies from './Companies'
import Jobs from './Jobs'
import Profile from './Profile'
import Login from './Login'
import Homepage from './Homepage'


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/companies" render={() => <Companies />} />
                <Route exact path="/companies/:name" render={(rtProps) => <Company companyName={rtProps.match.params.name}/>} />
                <Route exact path="/jobs" render={() => <Jobs />} />
                <Route exact path="/profile" render={() => <Profile />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/" render={() => <Homepage />} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

export default Routes;