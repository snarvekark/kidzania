import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import TeacherNav from './TeacherNav';
import { Auth } from "aws-amplify";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      classroom: "",
      selectstory: []
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

          
    async componentDidMount() {
        this.selectstoryAPI();
      };

  selectstoryAPI = async event => {
    try{
            fetch('https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/teacherstory?username="geethu"')
            .then(res => res.json())
            .then(res => {
              this.setState({
                  selectstory: res
                });
                console.log(this.state.selectstory);
            });
          }
          catch(error){
            console.log(error.message);
            alert(error);
          }
        }
      


  render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <TeacherNav />
            <div className="col-sm-8" id="content">
              <h2>Assign Story to Class</h2>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label class="form-label">
                    Select Story
                    <select id="story" value={this.state.value} onChange={this.onInputChange} 
                    aria-describedby="StoryHelp" placeholder="Select Story" className="form-control">
                        <option value="default" defaultValue>Select</option>
                        {this.state.selectstory.map(response => (
                    <option
                      key={response.selectstory}
                      value={response.selectstory}
                    >
                      {response.selectstory}
                    </option>
                  ))}  
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
