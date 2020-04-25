import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }
  constructor(props) {
    super(props)
    this.state = {
      jokes: []
    }
    this.upVote = this.handleVote.bind(this);
  }

  async addDadJokes() {
    let jokeArray = [];
    while (jokeArray.length < this.props.numJokesToGet) {
      let res = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: {Accept: 'application/json'}
      });
      jokeArray.push({text: res.data.joke, votes: 0, id: uuidv4()});
      // console.log(jokeArray);
    }
    this.setState({ jokes: jokeArray });
  }

  componentDidMount() {
    // if (localStorage.getItem('dad-jokes') === null) {
    //   console.log('adding dad-jokes to local storage!');
    //   this.addDadJokes();
    // } else {
    //   console.log('dad-jokes is already in local storage.  No change.');
    // }
    this.addDadJokes();
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j => 
        j.id === id ? {...j, votes: j.votes + delta} : j
      )
    }));
  }

  render() {
    const jokesRender = this.state.jokes.map((j) => (
      <Joke 
        text={j.text}
        id={j.id}
        key={j.id}
        votes={j.votes}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}
      />
    ))
    return(
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            Dad Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='emoji-laughing'/>
          <button className='JokeList-getmore'>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>{jokesRender}</div>
      </div>
    )
  }
}

export default JokeList;