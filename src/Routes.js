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
        <Route exact path="/companies" render={() => <Companies currUser={this.props.currUser}/>} />
        <Route exact path="/companies/:name" render={(rtProps) => <Company companyName={rtProps.match.params.name} />} />
        <Route exact path="/jobs" render={() => <Jobs />} />
        <Route exact path="/profile" render={() => <Profile currUser={this.props.currUser} updateCurrUser={this.props.updateCurrUser} />} />
        <Route exact path="/login" render={(rtProps) => <Login
          {...rtProps}
          currUser={this.props.currUser}
          storeUser={this.props.addCurrUser} />} />
        <Route exact path="/" render={() => <Homepage currUser={this.props.currUser} ß/>} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default Routes;