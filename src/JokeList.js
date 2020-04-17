import React, { Component } from 'react';
import axios from 'axios';

class JokeList extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = ({

  //   })
  // }

  async addDadJokes() {
    let jokeArray = [];
    for (let i = 0; i < 10; i++) {
      let jokeRes = await axios.get(`https://icanhazdadjoke.com/`, {headers: {Accept: 'application/json'}});
      let newJoke = {id: jokeRes.data.id, joke: jokeRes.data.joke}
      // console.log('newJoke: ', newJoke);
      jokeArray.push(newJoke);
    }
    localStorage.setItem('dad-jokes', JSON.stringify(jokeArray));
  }

  componentDidMount() {
    if (localStorage.getItem('dad-jokes') === null) {
      console.log('adding dad-jokes to local storage!');
      this.addDadJokes();
    } else {
      console.log('dad-jokes is already in local storage.  No change.');
    }
  }

  render() {
    return(
      <h1>JokeList here</h1>
    )
  }
}

export default JokeList;