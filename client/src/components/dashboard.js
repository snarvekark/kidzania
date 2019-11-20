import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

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
  render() {
    return(
      <div>
          <img src= {process.env.PUBLIC_URL + "/kidzania.png"} width = "1300px" ></img>
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <Link to="/Home" className="btn btn-primary">Home</Link>
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
                <div className="button button-primary">
                  {!this.props.auth.isAuthenticated && (
                    <div className="button button-primary">
                      <Link to="/Register" className="btn btn-primary">Register</Link>
                      <Link to="/Login" className="btn btn-primary">Login</Link>
                    </div>
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
