import React , { Component } from 'react';
import ParentNav from './ParentNav';
import axios from 'axios';
              
export default class PictureAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiResponse: [],
      Object1: '',
      Object2: '',
      Object3: '',
      Object4: '',
      Object1Val:'',
      Object2Val:'',
      Object3Val:'',
      Object4Val:'',
      cloudfrontURL:'',
      picturename:'',
      classnumber:'',
      url:'https://d1s1t98ejjvvri.cloudfront.net/Pictures/'
    };
  }

    componentDidMount() {
      
      console.log(localStorage.getItem('picturename'));
      console.log(localStorage.getItem('classnumber'));
      let api =
        `https://p21kqnf0a9.execute-api.us-west-1.amazonaws.com/dev/guessmyname?classnumber=${localStorage.getItem('classnumber')}&picturename=${localStorage.getItem('picturename')}`;
    axios.get(api)
  .then(response => {
    this.setState({
      apiResponse: response.data,
      Object1: response.data[0].toUpperCase(),
      Object2: response.data[2].toUpperCase(),
      Object3: response.data[4].toUpperCase(),
      Object4: response.data[6].toUpperCase(),
      Object1Val:response.data[1],
      Object2Val:response.data[3],
      Object3Val:response.data[5],
      Object4Val:response.data[7],
      url: this.state.url+localStorage.getItem('picturename')+'.jpeg'
    });
   /* console.log(this.state.apiResponse.data[0]);
    var str = response.data[0].object1;
    console.log(str.replace('_T','')); //gives me panda
    var parts = str.split('_');
    var answer = parts[parts.length - 1];
    console.log(answer); // gives me T*/
  })
  .catch(error => {
    console.log(error);
  });
    };

    checkans = async event => {
      try
      {
        if (event.target.value=='T')
        {
          alert("Yayyy!! you guessed it Right.")
        }
        else{
          alert("Oppss!! Try again. ")
        }
       
      } catch (e) {
        alert(e.message);
      }
    };


  render() {
    return (
      <div className="container">
           <center><h2 className="shadow">Guess My Name!!</h2></center>
           <div className="row" style={{marginTop: '30px'}}>
            <div className="col-sm-2">
              <ParentNav />
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-5">
              <div>
                <img src={this.state.url} alt="Uploaded images" height="350" width="400"/>
              </div>
            </div>
            <div className="col-sm-2">
              
              <div className="row shake-trigger">
                <b><p className="shake-slow">{this.state.Object1}</p></b>
              </div> 
              <div className="row shake-trigger">
                <b><p className="shake-slow">{this.state.Object3}</p></b>
              </div>
              <div className="row shake-trigger">
                <b><p className="shake-slow">{this.state.Object2}</p></b>
              </div>
              <div className="row shake-trigger">
                <b><p className="shake-slow">{this.state.Object4}</p></b>
              </div>
              
            </div>
            <div className="col-sm-3">

              <div className="row">
                <button  className="buttonclickme" value={this.state.Object1Val} onClick={this.checkans}> Click me! </button>
                <button  className="buttonclickme" value={this.state.Object3Val} onClick={this.checkans}> Click me! </button>
                <button  className="buttonclickme" value={this.state.Object2Val} onClick={this.checkans}> Click me! </button>
                <button  className="buttonclickme" value={this.state.Object4Val} onClick={this.checkans}> Click me! </button>
              </div> 
              
            </div>
          </div>
        </div>
    )
  }
}



