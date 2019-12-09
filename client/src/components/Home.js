import React from 'react';
import { withRouter, Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return(
      <div>
        <div className="home">
        <img src= {process.env.PUBLIC_URL + "/kidzania.png"} width = "100%" ></img>
          <div className="row">
            <div className="col-sm-5">
            <p className="shadow">
            Welcome to an interactive, fun and learning application for kids!! 
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
      </div>)
   }
}

export default withRouter(Home);