import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import ParentNav from './ParentNav';
import { Auth } from "aws-amplify";
import axios from 'axios';

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

  async componentDidMount() 
  {
    let url = "https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/storyassignment?storyTitle="+localStorage.getItem('storytitle')
    axios.get(url)
    .then(response => {
      this.setState({
        username: response.data
      })
      this.setState({
        imageurl: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+localStorage.getItem('storytitle')+".jpg",
        mp3url: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+localStorage.getItem('storytitle')+".mp3",
        texturl: "https://d1s1t98ejjvvri.cloudfront.net/"+this.state.username+"/"+localStorage.getItem('storytitle')+".txt",
      })
      console.log(this.state.username,this.state.mp3url,this.state.texturl,this.state.imageurl)
      })
    fetch(this.state.texturl)
    .then((r) => r.text())
    .then(text  => {
      console.log(text);
      this.setState({
        textcontent: text
      });
    })  
  };

  render(){
    if (this.state.mp3url != null) { 
      let abc = this.state.mp3url
      console.log("my abc:", abc) }
    
  return (
    
    <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <ParentNav />
            <div className="col-sm-8" id="content">
              <h3><label>Story Title: </label></h3>
              <div className="row">
                <div className="col-sm-7">
                <textarea id="content" class="md-textarea form-control " rows="10" value={this.state.textcontent}></textarea>
                </div>
                <div className="col-sm-4">
                <div>
                <img src={this.state.imageurl} alt="Uploaded images" height="250" width="300"/>
              </div>
                </div>
              </div>
              <div className="row">
              <div className="col-sm-3">
              <audio controls>
                <source src="https://d1s1t98ejjvvri.cloudfront.net/geethu/Test.mp3" type="audio/mpeg"/>
              </audio>
              <button class="btn btn-primary" onClick={this.play}><Icon name ="play"></Icon></button>
              <button class="btn btn-primary play" onClick={this.pause}><Icon name ="pause"></Icon></button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
}