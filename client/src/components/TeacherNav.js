import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

class TeacherNav extends React.Component {
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
      return <Redirect to='/Teacher' />
    }
  }

  picture(){
    window.location = '/PictureStory';
  }

  library(){
    window.location = '/Library';
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
                  <a id= "1" className="nav-link" href="#" onClick={this.setRedirect}>Create Story Book</a>
                </li>
                <li className="nav-item">
                  <a id= "2" className="nav-link" href="#" onClick={this.picture}>Create Picture Assignment</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Assign Homework</a>
                  <ul>
                    <li>
                      <a id= "3" href="#" onClick={this.library}>Assign Story</a>
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