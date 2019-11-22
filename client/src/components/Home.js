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
        <img src= {process.env.PUBLIC_URL + "/kidzania.png"} width = "1300px" ></img>
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
        <footer class="page-footer font-small blue fixed-bottom">
          <div class="footer-copyright text-center py-3">© 2019 Copyright
            <a href="http//localhost:3000"> Kidzania</a>
          </div>
        </footer>
      </div>)
   }
}

export default withRouter(Home);