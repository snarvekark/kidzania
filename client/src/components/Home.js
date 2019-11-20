import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Link, withRouter } from "react-router-dom";

class Home extends React.Component {
  render() {
    return(
      <div>
        <div className="home">
          <div className="row">
            <div className="col-sm-5">
            <p className="shadow">
            Welcome to an interactive fun and learning application for kids!! 
            </p>
            </div>
            <div className="col-sm-7">
            <p className="shadow1">
              <br></br>
            <ul>
            <li>Get a collection of stories</li>
            <li>Read the story or listen to the story</li>
            <li>Have fun with the pictures: Guess the objects!!</li>
            </ul>
            </p>
            </div>
          </div>
        </div>
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
      </div>)
   }
}

export default withRouter(Home);