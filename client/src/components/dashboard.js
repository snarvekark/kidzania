import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
/*import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { jsxAttribute } from '@babel/types';
import ReactDOM from 'react-dom';
import ToggleDisplay from 'react-toggle-display';*/

class Dashboard extends React.Component {

  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push("/Home");

      
    }catch(error) {
      console.log(error.message);
    }
  }

  showDashboard = async event => {
    if(this.props.auth.user.attributes.profile === "teacher")
      this.props.history.push("/Teacher");
    else
      this.props.history.push("/Parent");
  }
  render() {
    return(
      <div>
        <div>
          <nav className="navbar navbar-expand-sm blue navbar-blue">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <Link to="/Home" className="btn aqua-gradient">Home</Link>
            </div>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <React.Fragment>
                <Link onClick={this.showDashboard} className="btn aqua-gradient">My Dashboard</Link>
                </React.Fragment>
              )}
            </div>
            <div className="navbar-end">
              <div className="navbar-link">
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <React.Fragment>
                  <p className="text-primary">
                    Welcome, {this.props.auth.user.username}
                  </p>
                  </React.Fragment>
                )}
                <div className="row">
                  {!this.props.auth.isAuthenticated && (
                    <React.Fragment>
                    <div>
                      <Link to="/Register" className="btn aqua-gradient">Register</Link>
                    </div>
                    <div>
                      <Link to="/Login" className="btn aqua-gradient">Login</Link>
                    </div>
                    </React.Fragment>
                  )}
                  {this.props.auth.isAuthenticated && (
                     <Link to="/Home" onClick={this.handleLogOut} className="btn btn-primary">
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

export default withRouter(Dashboard);
