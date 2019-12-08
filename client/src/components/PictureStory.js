
import { withRouter } from "react-router-dom";
import TeacherNav from './TeacherNav';
import React, { Component } from "react";
import config from "../config";

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
  onInputChange = event => {
    this.setState({ 
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
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
                    </div>
                    <div>
                      <input type="text" placeholder="Add Labels" className="form-control"></input>
                    </div>
                  </div>
                  <div className="form-group col-md-5">
                <label class="form-label ">
                    Select Class
                    <select id="classroom" value={this.state.value} onChange={this.onInputChange} 
                    aria-describedby="ClassHelp" placeholder="Select Class" class="form-control">
                        <option value="default" defaultValue>Select</option>  
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                    </select>
                </label>
              </div>
                  <div className="form-group col-md-5">
                    <button type="submit" class="btn btn-primary">
                      Submit Objects
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default withRouter(PictureStory);