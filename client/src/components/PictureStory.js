import React, { Component } from "react";

export default class PictureStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      rekognitionRes : []
    };
  }
  
  uploadImageAPI = async event => {
    event.preventDefault();
    console.log("inside uploadImageAPI function");
    const fd = new FormData();
    fd.append("file", this.state.file);
    var uploadResponse = await fetch("http://localhost:8080/api/uploadImage", {
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
      file: URL.createObjectURL(event.target.files[0])
    })
  };

  render() {
    return (
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
    );
  }
}
