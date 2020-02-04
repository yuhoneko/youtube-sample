import React from 'react';
import './App.css';
import axios from 'axios';
import Iframe from 'react-iframe'

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default class App extends React.Component {
  state = {
    videos: [],
    keyword: '',
    boolean: false
  }

  change1 = () => {
    this.setState({
      keyword: 'アニメ',
    });
  }
  change2 = () => {
    this.setState({
      keyword: 'バラエティ',
    });
  }
  change3 = () => {
    this.setState({
      keyword: '音楽',
    });
  }
  change4 = () => {
    this.setState({
      keyword: 'スポーツ',
    });
  }
  change5 = () => {
    this.setState({
      keyword: 'キッズ',
    });
  }
  change6(event){
    const inputValue = event.target.value;
    this.setState({
      keyword: inputValue,
    });
  }

  handleClick　= () =>  {
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.state.keyword}&maxResults=20&key=${YOUTUBE_API_KEY}`;
    
    axios 

    
      .get(url)
      .then(response => {
          this.setState({
            videos: response.data.items,
            boolean: true
          });
      })
      .catch(() => {
          console.log('通信に失敗しました');
      });
  }

  render() {
    return (
      <>
        <p>GYAO!</p>
        <input onChange={(event)=>{this.change6(event)}}/>
        <input onClick={this.handleClick} type='submit'/>

        <ul>
          <li onMouseOver={this.change1} onClick={this.handleClick}>アニメ</li>
          <li onMouseOver={this.change2} onClick={this.handleClick}>バラエティ</li>
          <li onMouseOver={this.change3} onClick={this.handleClick}>音楽</li>
          <li onMouseOver={this.change4} onClick={this.handleClick}>スポーツ</li>
          <li onMouseOver={this.change5} onClick={this.handleClick}>キッズ</li>
        </ul>
        
        {this.state.boolean && 
          <>
            <Iframe url={this.state.videos[0].snippet.thumbnails.high.url}
              width="480px"
              height="360px"
            />
            <h1>{this.state.videos[0].snippet.title}</h1>
            
            {this.state.videos.map((item) => {
              return(
                <>
                  <Iframe url={item.snippet.thumbnails.default.url}
                    width="120px"
                    height="90px"
                  />
                  <p>{item.snippet.title}</p>
                </>
              )
            })}
          </>
        }
      </>
    );
  }
}

