import React from 'react';
import { withRouter } from "react-router-dom";

class TeacherNav extends React.Component {
 render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-20 sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="/Teacher">Create Story Book</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/PictureStory">Create Picture Assignment</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Assign Homework</a>
                  <ul>
                    <li>
                      <a href="/Library">Assign Story</a>
                    </li>
                    <li>
                      <a href="/PictureLibrary">Assign Picture</a>
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