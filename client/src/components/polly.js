import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

export default class Polly extends Component {
  constructor(props) {
    super(props);
      this.state = {
        response: [],
        value: ''
      };
      this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    axios.get("http://localhost:5000/awsnode/")
    .then(response => {
      console.log('hi',response);
    
      if (response) {
    
        this.setState({
            response: response.data
          
        });
      }
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="App" >
      <header className="App-header">
        <h3>Short Stories</h3>
          <div className="form-group">
              <div className="col-md-6">
                  <textarea className="form-control"  onChange={this.handleChange} ></textarea>
              </div>
          </div>
      <div>
        <button onClick={this.onClickHandler}>Submit Story</button>
      </div>
      </header>
    </div>
    )
  }
}

