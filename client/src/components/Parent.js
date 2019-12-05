import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import ParentNav from './ParentNav';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pictureNames : [],
      storyNames : [],
      selectedPicture : "",
      selectedStory : "",
      fileUrl : "",
      picture : "",
      classnumber:''
    };
  }


  selectpicture = async event =>
  {
    localStorage.setItem('classnumber', this.state.classnumber);
    localStorage.setItem('picturename',event.target.value);
  }
    handleSubmit = async event => {
       try
       {
         this.props.history.push("/PictureAssignment");
        
       } catch (e) {
         alert(e.message);
       }
     };

     handleSubmitStory = async event => {
      try
      {
        this.props.history.push("/StoryAssignment");
       
      } catch (e) {
        alert(e.message);
      }
    };

  classAssignment = async event => {
    event.preventDefault();
    var clickedId = event.target.id;
    if (clickedId)
    {
      let pictureURL =
        `https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/pictureassignment?username="mike"&classnumber=${clickedId}`;
      fetch(pictureURL)
        .then(response => response.json())
        .then(response => {
          this.setState({
            pictureNames: response,
            classnumber: clickedId
          });
          //console.log("Picture List : " + JSON.stringify(this.state.pictureNames));
        });
      //console.log("Outside Picture Fetch");
      if (this.state.pictureNames)
      {
        this.pictureList();
      }
      else
      {
        console.log("No pictures found");
      }

      let storyURL =
      `https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/teacherinfo/?username="geethu"&classnumber=${clickedId}`;
      fetch(storyURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          storyNames: response
        });
        //console.log("Story List : " + JSON.stringify(this.state.storyNames));
      });
      //console.log("Outside Story Fetch");
      if (this.state.storyNames)
        {
          this.storyList();
        }
        else
        {
          console.log("No stories found");
        }
    }
    else
    {
      console.log("Class not selected");
    }
    };

    pictureList = () => {
      let arrayOfPicture = this.state.pictureNames;
      if (arrayOfPicture) {
        return arrayOfPicture.map(data => {
          return (
            <option key={data.id} value={data.id}>
              {data.picturename}
            </option>
          );
        });
      }
    };

    storyList = () => {
      let arrayOfStory = this.state.storyNames;
      if (arrayOfStory) {
        return arrayOfStory.map(data => {
          return (
            <option key={data.id} value={data.id}>
              {data.storyTitle}
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
            <div className="col-sm-4">
              <div className="col-sm-20 sidebar">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.classAssignment} id="1">Class 1</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.classAssignment} id="2">Class 2</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.classAssignment} id="3">Class 3</a>
                  </li>
                </ul>
                <hr className="d-sm-none" />
              </div>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2>Welcome Parents</h2>
              <h5 style={{marginTop: '30px'}}>Select your Child's class to View Teacher Assigned Homework Labs</h5>
              <div className="form-group col-md-5">
                <label>Following Pictures were Assigned</label>
                <select data-placeholder="Type a letter to search" multiple 
                  name="picture_assigned" id="picture_assigned" className="form-control" onChange={this.selectpicture}>
                    <option value="default" defaultValue>
                      Select
                    </option>
                    {this.pictureList()}
                </select>
              </div>
              <div className="field">
                  <p className="control">
                  <button type="submit" className="btn btn-primary"
                    onClick= {this.handleSubmit}
                    >Guess My Name</button>
                  </p>
                  </div>
              <div className="form-group col-md-5">
                <label>Following Stories are Assigned</label>
                <select data-placeholder="Type a letter to search" multiple 
                  name="story_assigned" id="story_assigned" className="form-control">
                  <option value="default" defaultValue>
                      Select
                  </option>
                    {this.storyList()}
                </select>
              </div>
                <div className="field">
                  <p className="control">
                  <button type="submit" className="btn btn-primary"
                    onClick= {this.handleSubmitStory}
                    >Read Me the Story</button>
                  </p>
                </div>

            </div>
          </div>
        </div>
      </div>)
   }
}

export default Parent;