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
    super(props);}


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


  render() {
    return(
      <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <div className="col-sm-4">
              <ParentNav />
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2>Welcome Parent's</h2>
              <h5>Select your Child's class to View Teacher Assigned Homework Labs</h5>
              <div className="form-group col-md-5">
                <label>Following Pictures were Assigned</label>
                <select data-placeholder="Type a letter to search" multiple 
                  name="picture_assigned" id="icture_assigned" className="form-control">
                  <option>Picture 1</option>
                  <option>Picture 2</option>
                  <option>Picture 3</option>
                  <option>Picture 4</option>
                </select>
              </div>
              <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary"
                    onClick= {this.handleSubmit}
                    >Guess My Name</button>
                  </p>
                  </div>
              <div className="form-group col-md-5">
                <label>Following Stories are Assigned</label>
                <select data-placeholder="Type a letter to search" multiple 
                  name="story_assigned" id="story_assigned" className="form-control">
                  <option>Story 1</option>
                  <option>Story 2</option>
                  <option>Story 3</option>
                  <option>Story 4</option>
                </select>
              </div>
                <div className="field">
                  <p className="control">
                  <button type="submit" class="btn btn-primary"
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