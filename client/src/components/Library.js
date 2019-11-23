import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      classroom: ""
    };
  }
  
  validateForm() {
    return (
      this.state.story.length > 0 &&
      this.state.classroom.length > 0
    );
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state.value);
  };

  handleSubmit = async event => {
    event.preventDefault();
    try
    {
      alert("Assigned Story");
      this.props.history.push("/Teacher");
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
              <h2>Assign Story to Class</h2>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label class="form-label">
                    Select Story
                    <select id="story" value={this.state.value} onChange={this.onInputChange} 
                    aria-describedby="StoryHelp" placeholder="Select Story" class="form-control">
                        <option value="default" defaultValue>Select</option>  
                        <option value="Story1">Story 1</option>
                        <option value="Story2">Story 2</option>
                        <option value="Story3">Story 3</option>
                    </select>
                </label>
              </div>
              <div className="form-group">
                <label class="form-label">
                    Select Class
                    <select id="classroom" value={this.state.value} onChange={this.onInputChange} 
                    aria-describedby="ClassHelp" placeholder="Select Class" class="form-control">
                        <option value="default" defaultValue>Select</option>  
                        <option value="Class1">Class 1</option>
                        <option value="Class2">Class 2</option>
                        <option value="Class3">Class 3</option>
                    </select>
                </label>
              </div>
                <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary" isLoading={this.state.isLoading}
                    disabled={!this.validateForm()}>Assign</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>)
   }
}

export default withRouter(Library);
