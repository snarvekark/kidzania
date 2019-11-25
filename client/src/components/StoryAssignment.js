import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import TeacherNav from './TeacherNav';

export default class StoryAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true

    };

    this.url = "https://kidzaniapicture.s3.us-east-2.amazonaws.com/speech1.mp3";
    this.audio = new Audio(this.url);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    console.log(this.url);
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


  render(){
  return (
    <div>
        <div className="container" style={{marginTop: '30px'}}>
          <div className="row">
            <TeacherNav />
            <div className="col-sm-8" id="content">
              <h3><label>Story Title: </label></h3>
              <div className="row">
                <div className="col-sm-7">
                <textarea id="content" class="md-textarea form-control " rows="10" placeholder="Story Content"></textarea>
                </div>
                <div className="col-sm-4">
                <div className="fakeimg">Fake Image</div>
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



