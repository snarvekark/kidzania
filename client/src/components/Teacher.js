import React from 'react';
import config from "../config";
import { withRouter } from "react-router-dom";
import TeacherNav from './TeacherNav';

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      file: null
    };
  }

  validateForm() {
    return (
      this.state.title.length > 0 &&
      this.state.content.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
   // event.preventDefault();
    try
    {
      alert("Story Submitted");
      this.props.history.push("/Library");
      this.state.title = "";
      this.state.content = "";
     
    } catch (e) {
      alert(e.message);
    }
  };

  uploadStoryAPI = async event => {
    event.preventDefault();
    console.log("inside uploadStoryAPI function");
    const fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("file", this.state.file);
    fd.append("content", this.state.content);
    fd.append("username", this.props.auth.user.username);
    console.log(this.props.auth.user.username);
    fetch(config.serverUrl+"/api/uploadStory", {
      mode: 'no-cors',
      method: "POST",
      body: fd
    }).then(res => {
        this.handleSubmit();
        return res;
    });
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    })
  };

  navigatePictureStory = () =>{
    console.log("navigation to picture story page")
    this.props.history.push("/PictureStory");
  }

  render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
          <div className="col-sm-4">
            <TeacherNav />
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8" id="content">
              <h2>Create A New Story</h2>
              <form>
                <div class="form-group">
                  <input class="form-control form-control-lg" 
                    type="text" placeholder="Story Title" 
                    id="title" value={this.state.title}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div class="form-group">
                  <textarea id="content" class="md-textarea form-control" rows="8" 
                    placeholder="Story Content" value={this.state.content}
                    onChange={this.handleChange}>
                  </textarea>
                </div>
                <div class="form-group files">
                  <label>Add Image for Story</label>
                  <input type="file" class="form-control" onChange={this.onFileChange}></input>
                </div>
                <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary" isLoading={this.state.isLoading}
                    onClick={this.uploadStoryAPI}
                    disabled={!this.validateForm()}>Add Story</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>)
   }
}

export default withRouter(Teacher);