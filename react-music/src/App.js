import React, { Component } from 'react';
import $ from 'jquery';
import Pubsub from 'pubsub-js';
import  'jplayer';
import Header from './components/header/index';
import Player from './components/pages/player/index';
import List from './components/pages/list/index';
import { MUSIC_LIST } from './config/config';
import {Route,BrowserRouter, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem:  MUSIC_LIST[0]
    };
  }
  playMusic (musicItem) {
    $("#player").jPlayer("setMedia", {
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState ({
      currentMusicItem: musicItem
    })
  }
  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.currentMusicItem)
    console.log(index)
    let newIndex = null
    let musicListLength = this.state.musicList.length
    if(type === 'next') {
      newIndex = (index + 1 ) % musicListLength
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength
    }
    this.playMusic(this.state.musicList[newIndex])
  }
  findMusicIndex (musicItem) {
    return this.state.musicList.indexOf(musicItem)
  }
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    })
    this.playMusic(this.state.currentMusicItem)
    $("#player").bind($.jPlayer.event.ended, (e) => {
      this.playNext()
    });
    Pubsub.subscribe('DELETE_MUSIC',   (msg,  musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem
        })
      });
    })
    Pubsub.subscribe('PLAY_MUSIC',   (msg,  musicItem) => {
      this.playMusic(musicItem)
      });
    Pubsub.subscribe('PLAY_PREV',   (msg) => {
      this.playNext('prev')
    });
    Pubsub.subscribe('PLAY_NEXT',   (msg) => {
      this.playNext()
    });
  }
  componentWillUnmount(){
    $("#player").unbind($.jPlayer.event.ended)
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
  }

  render() {
    return (
      <div>
        <div id="player"></div>
      <Header />
        <Switch>
        <Route path='/' exact render={()=><Player currentMusicItem={this.state.currentMusicItem } />}/>
        <Route path='/list' exact render={()=><List currentMusicItem={this.state.currentMusicItem } musicList={this.state.musicList} />}/>
        </Switch>
      </div>
    );
  }
}
class Root extends Component {
  render() {
    return (
    <BrowserRouter >
      <Route  path='/' component={App} />
    </BrowserRouter>
    )
  }
}


export default Root;
