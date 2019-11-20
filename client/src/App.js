import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Teacher from './components/Teacher';
import Parent from './components/Parent';
import PictureAssignment from './components/PictureAssignment';
import StoryAssignment from './components/StoryAssignment';
import PictureStory from './components/PictureStory';
import Library from './components/Library';
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
	          <div className="bg">
	            <Dashboard auth={authProps}/>
	            <Switch>
	              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
	              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
	              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
	              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />} />
	              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
	              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
	              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
	              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
                <Route exact path="/Teacher" render={(props) => <Teacher {...props} auth={authProps} />} />
                <Route exact path="/Parent" render={(props) => <Parent {...props} auth={authProps} />} />
                <Route exact path="/PictureAssignment" render={(props) => <PictureAssignment {...props} auth={authProps} />} />
                <Route exact path="/StoryAssignment" render={(props) => <StoryAssignment {...props} auth={authProps} />} />
                <Route exact path="/PictureStory" render={(props) => <PictureStory {...props} auth={authProps} />} />
                <Route exact path="/Library" render={(props) => <Library {...props} auth={authProps} />} />

                
	            </Switch>
	          </div>
	        </Router>
	      </div>
	    );
	}
}

export default App;
