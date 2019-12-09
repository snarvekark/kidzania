import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import ParentNav from './ParentNav';
import { Auth } from "aws-amplify";
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

export default class StoryAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      username:'',
      imageurl:'',
      mp3url:'',
      texturl: '',
      textcontent: ''
    };
  }

   componentDidMount() 
  {
    var str = localStorage.getItem('storytitle');
    var replaced = str.split(' ').join('%20');
    console.log(replaced);
    let url = "https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/storyassignment?storyTitle="+localStorage.getItem('storytitle')
    axios.get(url)
    .then(response => {
      this.setState({
        username: response.data
      })
      this.setState({
        imageurl: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+replaced+".jpg",
        mp3url: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+replaced+".mp3",
        texturl: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+replaced+".txt",
      })
      console.log(this.state.username,this.state.mp3url,this.state.texturl,this.state.imageurl)
      })
    axios.get(this.state.texturl)
    .then((r) => r.text())
    .then(text  => {
      console.log(text);
      this.setState({
        textcontent: text
      });
    })  
  };

  render(){
    
  return (
    
    <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <ParentNav />
            <div className="col-sm-8" id="content">
              <h3><label>Story Title: </label></h3>
              <div className="row">
                <div className="col-sm-7">
                <textarea id="content" class="md-textarea form-control " rows="14" value={this.state.textcontent}></textarea>
                </div>
                <div className="col-sm-4">
                <div>
                <img src={this.state.imageurl} alt="Uploaded images" height="300" width="450"/>
              </div>
                </div>
              </div>
              <div className="row">
              <div className="col-sm-7">
              <Link className="alink" to={this.state.mp3url}>Listen to the story!!</Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
}