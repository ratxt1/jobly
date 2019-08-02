import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
// import './Login.css';

const DEFAULT_STATE = {
  formState: 'login',
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  errorMessage: '',
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      let token;
      if (this.state.formState === 'login') {
        token = await JoblyApi.logInUser(this.state);
      } else {
        token = await JoblyApi.registerUser(this.state);
      }
      // save token in local storage 
      window.localStorage.setItem("token", token);
      // set currUser in App
      this.props.storeUser(this.state.username)
      // imperatively redirect to jobs
      this.props.history.push("/jobs");
      // reset form
      this.setState(DEFAULT_STATE);
    } catch (err) {
      this.setState({ errorMessage: err[0] });
    }
  }

  toggleForm() {
    this.setState(st => {
      const formState = (st.formState === 'login') ? 'signup' : 'login'
      return { 
        formState,
        errorMessage: '' 
      }
    });
  }

  render() {
    const { formState, errorMessage } = this.state
    const loginTabClassName = (formState === 'login') ? "nav-link active" : "nav-link"
    const signupTabClassName = (formState === 'signup') ? "nav-link active" : "nav-link"

    const formTabs = (
      <ul className="nav nav-pills">
        <li className="nav-item login">
          <button className={loginTabClassName} onClick={this.toggleForm} disabled={formState === 'login'}>Login</button>
        </li>
        <li className="nav-item signup">
          <button className={signupTabClassName} onClick={this.toggleForm} disabled={formState === 'signup'}>Signup</button>
        </li>
      </ul>
    )

    return (
      <div className="Login row mt-5">
        <div className="col-8 offset-2">
          {formTabs}
          <form onSubmit={this.handleSubmit} className="card p-3 bg-light">
            <div className="form-group">
              <label htmlFor="username"></label>
              <p className="text-left"><b>Username</b></p>
              <input
                id="username"
                onChange={this.handleChange}
                name="username"
                placeholder='Username'
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <p className="text-left"><b>Password</b></p>
              <input
                id="password"
                type="password"
                onChange={this.handleChange}
                name="password"
                placeholder='Password'
                className="form-control"
                required
              />
            </div>

            {(formState === 'signup')
              ? (
                <span>
                  <div className="form-group">
                    <label htmlFor="first_name"></label>
                    <p className="text-left"><b>First name</b></p>
                    <input
                      id="first_name"
                      onChange={this.handleChange}
                      name="first_name"
                      placeholder='First Name'
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name"></label>
                    <p className="text-left"><b>Last name</b></p>
                    <input
                      id="last_name"
                      onChange={this.handleChange}
                      name="last_name"
                      placeholder='Last Name'
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
                      placeholder='Email'
                      className="form-control"
                      required
                    />
                  </div>
                </span>
              ) : null}

            {(errorMessage)
              ? <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
              : null
            }
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;


