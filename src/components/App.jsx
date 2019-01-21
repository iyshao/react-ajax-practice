// import { stringify } from "querystring";
import React from 'react';

var postMessage = (message, successCB) => {
  var url = 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting'
  
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(message),
    success: function(data) {
      successCB(data); 
    },
    error: function(data) {
      console.log('error: ', data);
    }
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      response: 'Send a message!'
    };

    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleMessage(event) {
    this.setState({message: event.target.value})
  }

  handleSubmit(event) {
    // alert(`${this.state.name} says ${this.state.message}`);
    event.preventDefault();
    postMessage(this.state, (data) => {
      this.setState({response: data});
      console.log('data in postMessage -----------', this.state)
    });
    this.setState({name: '', message: ''});
  }

  render() {
    return (
      <div>
        <div>Server Response:</div>
        <div>{this.state.response}</div>
        <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name="name" value={this.state.name} onChange={this.handleName}/>
        Message:
        <input type="text" name="message" value={this.state.message} onChange={this.handleMessage}/>
        <input type='submit' value='Send Message'/>
        </form>
      </div>
    )
  }
}

export default App;