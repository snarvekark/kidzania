import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import ParentNav from './ParentNav';
import { Auth } from "aws-amplify";

export default class StoryAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      texturl: "https://d1s1t98ejjvvri.cloudfront.net/geethu/"+localStorage.getItem('storytitle')+".txt",
      textcontent: ""
    };

    this.url = "https://d1s1t98ejjvvri.cloudfront.net/geethu/"+localStorage.getItem('storytitle')+".mp3";
    this.imageurl= "https://d1s1t98ejjvvri.cloudfront.net/geethu/"+localStorage.getItem('storytitle')+".jpg";
    this.texturl = "https://d1s1t98ejjvvri.cloudfront.net/geethu/"+localStorage.getItem('storytitle')+".txt";
    this.audio = new Audio(this.url);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  play(){
    this.setState({
      play: true,
      pause: false
    });
    console.log(this.audio);
    this.audio.play();
  }

  pause(){
  this.setState({ play: false, pause: true });
    this.audio.pause();
  }

  async componentDidMount() 
  {
    console.log(localStorage.getItem('storytitle'));
    console.log(this.imageurl,this.texturl,this.url);
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
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
                <img src={this.imageurl} alt="Uploaded images" height="250" width="300"/>
              </div>
                </div>
              </div>
              <div className="row">
              <div className="col-sm-3">
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