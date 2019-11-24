import React , { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

/*
<ul class="shake-trigger">
                  <li class="shake-slow">Panda</li>
                  <li class="shake-slow">Tree</li>
                  <li class="shake-slow">Tiger</li>
                  <li class="shake-slow">Food</li>
              </ul>*/
export default class PictureAssignment extends Component {
  render() {
    return (
      <div className="container" style={{marginTop: '30px'}}>
        <center><h2 className="shadow">!!!Guess me!!!</h2></center>
           <div className="row">
           <div className="col-sm-6">
            <div>
              <img src='https://kidzaniapicture.s3.us-east-2.amazonaws.com/panda.jpeg' alt="Uploaded images" height="350" width="500"/>
            </div>
            </div>
            <div className="col-sm-2">
            <div className="row shake-trigger">
              <b><p className="shake-slow">Panda</p></b>
            </div>
            <div className="row shake-trigger">
              <b><p className="shake-slow">Tree</p></b>
            </div>
            <div className="row shake-trigger">
              <b><p className="shake-slow">Tiger</p></b>
            </div>
            <div className="row shake-trigger">
              <b><p className="shake-slow">Food</p></b>
            </div>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <a className="buttonclickme" data-micron="pop">Click Me!</a> 
                <a className="buttonclickme" data-micron="pop">Click Me!</a> 
                <a className="buttonclickme" data-micron="pop">Click Me!</a> 
                <a className="buttonclickme" data-micron="pop">Click Me!</a> 
              </div> 
            </div>
             
           </div>
        </div>



    )
  }
}



