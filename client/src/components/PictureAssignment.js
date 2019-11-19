import React , { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';


export default class PictureAssignment extends Component {
  render() {
    return (

        <div class="container">
        <center><h4>!!Guess the objects!!</h4></center>
        <div className="row">
            <div className="col-sm-6">
            <div>
              <img src='https://kidzaniapicture.s3.us-east-2.amazonaws.com/panda.jpeg' alt="Uploaded images" height="300" width="400"/>
            </div>
            </div>
            <div className="col-sm-1">
                  <button  type="submit" class="btn btn-primary" >Object1</button> </div>
           <div className="col-sm-1">
                  <button type="submit" class="btn btn-primary" >Object2</button> </div>
           <div className="col-sm-1">
                  <button  type="submit" class="btn btn-primary" >Object3</button> </div>
            <div className="col-sm-1">
                  <button  type="submit" class="btn btn-primary" >Object4</button>
            </div>
          </div>
          <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
            </div>

    )
  }
}



