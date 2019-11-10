import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    username: "",
    password: "",
    data: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      //console.log(JSON.stringify(user));
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      Auth.currentAuthenticatedUser()
      .then(data => {
       if(data.attributes.profile === 'teacher')
       {
         this.props.history.push("/Teacher");
       }
       else
       {
        this.props.history.push("/Parent");
       }
      })
      //this.props.history.push("/");
    }catch(error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="form-group col-md-3">
              <input 
                className="form-control" 
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <input 
                className="form-control" 
                type="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <div className="form-group col-md-3">
              <a href="/forgotpassword">Forgot password?</a>
            </div>
            <div className="form-group col-md-3">
              <button className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(LogIn);