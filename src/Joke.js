import React, { Component } from 'react';

class Joke extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return(
      <div>{this.props.jokeText}</div>
    )
  }
}

export default Joke;