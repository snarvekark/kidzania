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
    this.state.file = event.target.files[0];
  };

  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col-sm-4">
            <label>Upload Pictures for kids to guess objects!</label>
            <input
              type="file"
              class="form-control"
              onChange={this.onFileChange}
            ></input>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.uploadImageAPI}
            >
              Upload Pictures
            </button>
          </div>
          <div className="col-sm-2">
            <label>Objects Detected are:</label>
            <div className="col-sm-1">
              <button type="submit" class="btn btn-primary">
                {this.state.rekognitionRes[0]}
              </button>{" "}
            </div>
            <div className="col-sm-1">
              <button type="submit" class="btn btn-primary">
              {this.state.rekognitionRes[1]}
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <label>
              Please insert random object to give as option to kids:
            </label>
            <div className="col-sm-4">
              <input type="text" placeholder="Insert Random Object"></input>
            </div>
            <div className="col-sm-4">
              <input type="text" placeholder="Insert Random Object"></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 fakeimg">Image</div>
          <div className="col-sm-3 text-right">
            <button type="submit" class="btn btn-primary">
              Submit Objects
            </button>
          </div>
        </div>
      </div>
    );
  }
}
