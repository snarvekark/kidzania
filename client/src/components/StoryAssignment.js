import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

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
    < div className = "App-header">
    <section className="section auth ">
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
    </section>
    <div className="jumbotron text-center" style={{marginBottom: 0}}>
          <p>Copyright. KidZania 2019</p>
        </div>
    </div>
    
  )
}
}



