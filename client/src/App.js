import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Upload from './components/upload';
import { Auth } from "aws-amplify";


class App extends React.Component
{
state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  //Continue Session
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
	render(){
	  const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
	    }
	    return (
	      !this.state.isAuthenticating &&
			<div className="App">
	        <Router>
	          <div>
	            <Dashboard auth={authProps}/>
	            <Switch>
	              <Route exact path="/home" render={(props) => <Home {...props} auth={authProps} />} />
	              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
	              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
	              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />} />
	              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
	              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
	              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
	              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
                <Route exact path="/upload" render={(props) => <Upload {...props} auth={authProps} />} />
                
	            </Switch>
	          </div>
	        </Router>
	      </div>
	    );
	}
}

export default App;
