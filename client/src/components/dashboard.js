import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { Auth } from "aws-amplify";

class Dashboard extends React.Component {
   handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
  }
  render() {
    return(
      <div>
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <h1>KidZania</h1> 
        </div>
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Teacher</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Parent</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Library</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Action Words</a>
                </li>
                <li className="nav-item">
                  {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <a className="nav-link" href="/upload">Upload</a>
                  )}
                </li>    
              </ul>
            </div>
            <div className="navbar-end">
              <div className="navbar-link">
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <React.Fragment>
                  <p className="text-primary">
                    Welcome, {this.props.auth.user.username} , 
                    {this.props.auth.user.username} 
                  </p>
                  </React.Fragment>
                )}
                <div className="button button-primary">
                  {!this.props.auth.isAuthenticated && (
                    <div className="button button-primary">
                      <a href="/register" className="navbar-brand">
                        <strong>Register</strong>
                      </a>
                      <a href="/login" className="navbar-brand">
                        Log in
                      </a>
                    </div>
                  )}
                  {this.props.auth.isAuthenticated && (
                    <a href="/" onClick={this.handleLogOut} className="button is-light">
                      Log out
                    </a>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>  
      </div>);
    }
}

export default Dashboard;
