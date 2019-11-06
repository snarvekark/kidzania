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
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-4">
              <h2>About</h2>
              <h5>Photo</h5>
              <div className="fakeimg">Fake Image</div>
              <p>About Us Text</p>
              <h3>Links</h3>
              <p>Links</p>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Active Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled Link</a>
                </li>
              </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2>TITLE</h2>
              <h5>Description</h5>
              <div className="fakeimg">Image</div>
              <p>Text</p>
              <p>More Text.</p>
              <br />
              <h2>TITLE</h2>
              <h5>Title description</h5>
              <div className="fakeimg">Image</div>
              <p>Some text</p>
              <p>Text</p>
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