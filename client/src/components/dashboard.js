import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { Auth } from "aws-amplify";

class Dashboard extends React.Component {
    handleLogIn = async event => {
      event.preventDefault();
      try {
        Auth.currentAuthenticatedUser({
          bypassCache: false  
      }).then(user => console.log(user))
      .catch(err => console.log(err));
      }catch(error) {
        console.log(error.message);
      }
    }

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
                  <Link to="/Home" className="btn btn-primary">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Parent" className="btn btn-light">Parent</Link>
                </li>
                <li className="nav-item">
                  {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <Link to="/Teacher" className="btn btn-primary">Teacher</Link>
                  )}
                </li>    
              </ul>
            </div>
            <div className="navbar-end">
              <div className="navbar-link">
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <React.Fragment>
                  <p className="text-primary">
                    Welcome, {this.props.auth.user.username} , {this.props.auth.email} 
                  </p>
                  </React.Fragment>
                )}
                <div className="button button-primary">
                  {!this.props.auth.isAuthenticated && (
                    <div className="button button-primary">
                      <Link to="/Register" className="btn btn-primary">Register</Link>
                      <Link to="/Login" className="btn btn-primary">Login</Link>
                    </div>
                  )}
                  {this.props.auth.isAuthenticated && (
                     <Link to="/" onClick={this.handleLogOut} className="btn btn-primary">
                      Log Out
                    </Link>
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
