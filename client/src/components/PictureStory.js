<<<<<<< HEAD
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import TeacherNav from './TeacherNav';
=======
import React, { Component } from "react";
import config from "../config";
>>>>>>> c3ecaebe68509006289278031c7fd66aa8a7861f

class PictureStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      rekognitionRes : [],
      fileUrl : ""
    };
  }
  
  uploadImageAPI = async event => {
    event.preventDefault();
    console.log("inside uploadImageAPI function");
    const fd = new FormData();
    fd.append("file", this.state.file);
    var uploadResponse = await fetch(config.serverUrl+"/api/uploadImage", {
      //mode: 'no-cors',
      method: "POST",
      body: fd
    });
    this.setState({
      rekognitionRes : await uploadResponse.json()
    });
    console.log("response array"+ this.state.rekognitionRes );
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0],
      fileUrl : URL.createObjectURL(event.target.files[0])
    })
  };

  render() {
    return (
<<<<<<< HEAD
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <TeacherNav />
            <div className="col-sm-8" id="content">
              <h2>Create A New Picture Assignment</h2>
                <form> 
                  <div class="form-group col-md-5">
                    <label>Select a Picture</label>
                    <input
                      type="file"
                      class="form-control"
                      onChange={this.onFileChange}
                      placeholder="Select a Picture">
                    </input>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={this.uploadImageAPI}>
                      Detect Objects
                    </button>
                  </div>
                  <div className="float-right">
                      <img src={this.state.file}/>
                    </div>
                  <div className="form-group col-md-5">
                    <label>Following Objects were detected</label>
                    <select data-placeholder="Type a letter to search" multiple 
                      name="objects_detected" id="objects_detected" className="form-control">
                      <option>{this.state.rekognitionRes[0]}</option>
                      <option>{this.state.rekognitionRes[1]}</option>
                      <option>{this.state.rekognitionRes[2]}</option>
                      <option>{this.state.rekognitionRes[3]}</option>
                    </select>
                  </div>
                  <div className="form-group col-md-5">
                    <label>
                      Additional lables for selection
                    </label>
                    <div>
                      <input type="text" placeholder="Add Labels" className="form-control"></input>
                    </div>
                    <div>
                      <input type="text" placeholder="Add Labels" className="form-control"></input>
                    </div>
                  </div>
                  <div className="form-group col-md-5">
                    <button type="submit" class="btn btn-primary">
                      Submit Objects
                    </button>
                  </div>
                </form>
              </div>
=======
      <div class="container">
        <h3>Picture Assignment</h3>
        <form> 
          <div class="form-group col-md-5">
            <label>Select a Picture</label>
            <input
              type="file"
              class="form-control"
              onChange={this.onFileChange}
              placeholder="Select a Picture">
            </input>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.uploadImageAPI}>
              Detect Objects
            </button>
          </div>
          <div className="float-right">
              <img src={this.state.fileUrl}/>
            </div>
          <div className="form-group col-md-5">
            <label>Following Objects were detected</label>
            <select data-placeholder="Type a letter to search" multiple 
              name="objects_detected" id="objects_detected" className="form-control">
              <option>{this.state.rekognitionRes[0]}</option>
              <option>{this.state.rekognitionRes[1]}</option>
              <option>{this.state.rekognitionRes[2]}</option>
              <option>{this.state.rekognitionRes[3]}</option>
            </select>
          </div>
          <div className="form-group col-md-5">
            <label>
              Additional lables for selection
            </label>
            <div>
              <input type="text" placeholder="Add Labels" className="form-control"></input>
>>>>>>> c3ecaebe68509006289278031c7fd66aa8a7861f
            </div>
          </div>
        </div>
    );
  }
}
export default withRouter(PictureStory);