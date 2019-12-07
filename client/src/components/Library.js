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
      storyNames: [],
      selectedStory: "",
      selectedClass: ""
    };
  }
  
  assingClass = async event => {
    event.preventDefault();
    let story = this.state.selectedStory;
    let classnr = this.state.selectedClass;
    console.log("Story : " + story + "Class : " + classnr); 
    let classset = {
      classnumber: classnr,
      username: "bradpitt",
      storyTitle: story
    };
    console.log("Inside method");
      console.log(JSON.stringify(classset));
      fetch(`https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/teacherstory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify(classset)
        }).then(response => {
          console.log("Successful" + response);
          alert("HW Assigned");
          this.props.history.push("/Library");
        }).catch(error=> {
          console.log("Error" + error);
          this.props.history.push("/Library");
        });
  }

  onStoryChange = event => {
    this.state.selectedStory = event.target.value;
  };

  onClassChange = event => {
    this.state.selectedClass = event.target.value;
  };

        
     async componentDidMount() {
        this.selectstoryAPI();
      };

    selectstoryAPI() {
      try{
          fetch(`https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/teacherstory?username="geethu"`)
          .then(response => response.json())
          .then(response => {
            this.setState({
          storyNames: response
        });
        console.log("Story List : " + this.state.storyNames);
          });
        }
        catch(error){
          console.log(error.message);
          alert(error);
        }
      };

      storyList(){
        let arrayOfStory = this.state.storyNames;
        if (arrayOfStory) {
          return arrayOfStory.map(data => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          });
        }
      };


  render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <TeacherNav />
            <div className="col-sm-8" id="content">
              <h2>Assign Story to Class</h2>
              <div className="form-group">
                <label class="form-label">
                    Select Story
                    <select id="story" value={this.state.value} onChange={this.onStoryChange}
                    aria-describedby="StoryHelp" placeholder="Select Story" className="form-control">
                       <option value="default" defaultValue>
                      Select
                    </option>
                    {this.storyList()}
                    </select>
                </label>
              </div>
              <div className="form-group">
                <label class="form-label">
                    Select Class
                    <select id="classroom" onChange={this.onClassChange} value={this.state.value}
                    aria-describedby="ClassHelp" placeholder="Select Class" class="form-control">
                        <option value="default" defaultValue>Select</option>  
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                    </select>
                </label>
              </div>
                <div className="field">
                  <p className="control">
                  <button class="btn btn-primary" onClick={this.assingClass}>Assign</button>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>)
   }
}

export default withRouter(Library);
