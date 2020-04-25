import React, { Component } from 'react';

class Joke extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick(evt) {
  //   evt.preventDefault();
  //   this.props.handleVote(this.props.id, 1);
  // }

  render() {
    return(
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div>{this.props.text}</div>
      </div>
    )
  }
}

export default Joke;