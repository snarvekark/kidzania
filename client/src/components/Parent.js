import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

class Parent extends React.Component {
  render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-4">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Class 1</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Class 2</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Class 3</a>
                </li>
             </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2>Welcome to Parent's corner</h2>
              <h5>Select your Child's class to View Teacher Assigned Homework Labs</h5>
              <div className="fakeimg">Image</div>
              <p>Text</p>
              <p>More Text.</p>
            </div>
          </div>
        </div>
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
      </div>)
   }
}

export default Parent;