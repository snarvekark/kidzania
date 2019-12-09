import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

class ParentNav extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/Parent' />
    }
  }
 render() {
    return(
      <div>
        {this.renderRedirect()}
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-20 sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.setRedirect}>Class 1</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.setRedirect}>Class 2</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.setRedirect}>Class 3</a>
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