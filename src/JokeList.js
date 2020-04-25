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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
    }
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    console.log(this.seenJokes)
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async addDadJokes() {
    try{
      let jokeArray = [];
      while (jokeArray.length < this.props.numJokesToGet) {
        let res = await axios.get(`https://icanhazdadjoke.com/`, {
          headers: {Accept: 'application/json'}
        });
        let newJoke = res.data.joke;
        if(!this.seenJokes.has(newJoke)) {
          jokeArray.push({text: newJoke, votes: 0, id: uuidv4()});
        } else {
          console.log("FOUND A DUPLICATE!")
          console.log(newJoke);
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokeArray]
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({loading: false});
    }
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.addDadJokes();
    }
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j => 
        j.id === id ? {...j, votes: j.votes + delta} : j
      )
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({loading: true}, this.addDadJokes);
  }

  render() {
    if (this.state.loading) {
      return(
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
    const jokesRender = jokes.map((j) => (
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
          <button className='JokeList-getmore' onClick={this.handleClick}>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>{jokesRender}</div>
      </div>
    )
  }
}

export default JokeList;