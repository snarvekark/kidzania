import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    family_name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    profile:"",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

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
    const { name, family_name, username, email, password, profile } = this.state;
    try
    {
      const signUpResponse = await Auth.signUp({  
      username: this.state.username,
      password: this.state.password,
      attributes: {
        name: this.state.name,
        family_name: this.state.family_name,
        email: this.state.email,
        profile: this.state.profile
      }
      });
      this.props.history.push("/welcome");
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
          <div class="form-row">
            <div className="form-group col-md-3">
              <input 
                className="form-control" 
                type="text"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter First Name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <input 
              className="form-control" 
              type="text"
              id="family_name"
              aria-describedby="familyNameHelp"
              placeholder="Enter Last Name"
              value={this.state.family_name}
              onChange={this.onInputChange}
              />
            </div>
          </div>
          <div class="form-row">
            <div className="form-group col-md-3">
              <input 
                className="form-control" 
                type="text"
                id="username"
                aria-describedby="userNameHelp"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <input 
                className="form-control" 
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="form-row">
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
              <input 
                className="form-control" 
                type="password"
                id="confirmpassword"
                placeholder="Confirm password"
                value={this.state.confirmpassword}
                onChange={this.onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="form-group col-md-3">
            <label for="profile">
              Profile Type
            </label>
              <select className="form-control" id="profile" value={this.state.value} onChange={this.onInputChange} 
                aria-describedby="userTypeHelp" placeholder="Enter usertype">
                <option value="default" defaultValue>Select</option>  
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
          </div>
          <div className="form-group col-md-3">
            <a href="/forgotpassword">Forgot password?</a>
          </div>
          <div className="form-group col-md-3">
            <button className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
}

export default withRouter(Register);