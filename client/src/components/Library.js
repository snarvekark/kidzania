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
      class: ""
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
              <div className="field">
                <p className="control">
                    <label>
                        Select Story
                        <select id="story" value={this.state.value} onChange={this.onInputChange} 
                        aria-describedby="StoryHelp" placeholder="Select Story">
                            <option value="default" defaultValue>Select</option>  
                            <option value="Story1">Story 1</option>
                            <option value="Story2">Story 2</option>
                            <option value="Story3">Story 3</option>
                        </select>
                    </label>
                </p>
              </div>
              <div className="field">
                <p className="control">
                    <label>
                        Select Class
                        <select id="classroom" value={this.state.value} onChange={this.onInputChange} 
                        aria-describedby="ClassHelp" placeholder="Select Class">
                            <option value="default" defaultValue>Select</option>  
                            <option value="Class1">Class 1</option>
                            <option value="Class2">Class 2</option>
                            <option value="Class3">Class 3</option>
                        </select>
                    </label>
                </p>
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
        <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
      </div>)
   }
}

export default withRouter(Library);