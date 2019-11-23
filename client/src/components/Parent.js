import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';


class Parent extends React.Component {
  constructor(props) {
    super(props);}


    handleSubmit = async event => {
       try
       {
         this.props.history.push("/PictureAssignment");
        
       } catch (e) {
         alert(e.message);
       }
     };

     handleSubmitStory = async event => {
      try
      {
        this.props.history.push("/StoryAssignment");
       
      } catch (e) {
        alert(e.message);
      }
    };


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
              <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary"
                    onClick= {this.handleSubmit}
                    >Picture Assignment</button>
                  </p>
                  </div>
                <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary"
                    onClick= {this.handleSubmitStory}
                    >Story Assignment</button>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>)
   }
}

export default Parent;