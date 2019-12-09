import React from 'react';
import {  withRouter, Link } from "react-router-dom";
import TeacherNav from './TeacherNav';

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      classroom: "",
      selectPicture: []
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
      alert("Picture Assigned");
      this.props.history.push("/Teacher");
    } catch (e) {
      alert(e.message);
    }
  };

          
    async componentDidMount() {
        this.selectPictureAPI();
      };

  selectPictureAPI = async event => {
    try{
            // add API for picture
            fetch('https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/pictureassignment?classnumber="1"')
            .then(res => res.json())
            .then(res => {
              this.setState({
                selectPicture: res
                });
                console.log(this.state.selectPicture[0].picturename);
                console.log(this.state.selectPicture);
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
              <h2>Assign Picture to Class</h2>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label class="form-label">
                    Select Picture
                    <select id="picture" value={this.state.value} onChange={this.onInputChange} 
                    aria-describedby="StoryHelp" placeholder="Select picture" className="form-control">
                        <option value="default" defaultValue>Select</option>
                        {this.state.selectPicture.map(response => (
                    <option
                      key={response.selectPicture}
                      value={response.selectPicture}
                    >
                      {response.selectPicture}
                    </option>
                  ))}  
                        <option value="Picture1">Picture 1</option>
                        <option value="Picture2">Picture 2</option>
                        <option value="Picture3">Picture 3</option>
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
