import React, { Component } from 'react';
import axios from 'axios';
import S3FileUpload from 'react-s3';
//import Putdata from './Putdata.js';

class Upload extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : ""
    }
  }

 handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    console.log(fileParts);
    axios.post("http://localhost:3001/s3sign",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      console.log('Return Data : ' + returnData);
      var signedRequest = returnData.signedRequest;
      console.log('Signed Request : ' + signedRequest);
      var url = returnData.url;
      this.setState({url: url})
      console.log("Request " + signedRequest);
           // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>File Uploaded</h3>
        <a href={this.state.url}>Click the link to access the file</a> 
        <br/>
        <button onClick="#">DELETE</button>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>Upload your file</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>

    );
  }
}

export default Upload;