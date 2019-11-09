import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  validateForm() {
    return (
      this.state.title.length > 0 &&
      this.state.content.length > 0
    );
  }

  validateConfirmationForm() {
    return this.state.code.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try
    {
      alert("Story Submitted");
      this.props.history.push("/Teacher");
      this.state.title = "";
      this.state.content = "";
     
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
                  <a className="nav-link active" href="#" onclick={this.StoryOptions}>Story Book</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Picture Story</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">HomeWork</a>
                </li>
             </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8" id="content">
              <h2>Create A New Story</h2>
              <form onSubmit={this.handleSubmit}>
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
                <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary" isLoading={this.state.isLoading}
                    disabled={!this.validateForm()}>Add Story</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
      </div>)
   }
}

export default withRouter(Teacher);