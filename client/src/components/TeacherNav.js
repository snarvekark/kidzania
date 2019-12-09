import React from 'react';
import { Redirect, withRouter, Link } from "react-router-dom";

class TeacherNav extends React.Component {
 render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-20 sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <Link id= "1" className="nav-link" to="/Teacher">Create Story Book</Link>
                </li>
                <li className="nav-item">
                  <Link id= "2" className="nav-link" to="/PictureStory">Create Picture Assignment</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Assign Homework</a>
                  <ul>
                    <li>
                      <Link id= "3" to="/Library">Assign Story</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr className="d-sm-none" />
            </div>
         </div>
        </div>
      </div>)
   }
}

export default withRouter(TeacherNav);