import React from 'react';
import { withRouter } from "react-router-dom";

class ParentNav extends React.Component {
 render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-20 sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="/Parent">Class 1</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Parent">Class 2</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Parent">Class 3</a>
                </li>
              </ul>
              <hr className="d-sm-none" />
            </div>
         </div>
        </div>
      </div>)
   }
}

export default withRouter(ParentNav);