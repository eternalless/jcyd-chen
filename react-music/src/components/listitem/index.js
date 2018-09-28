import React, { Component } from 'react';
import Pubsub from 'pubsub-js';
import './index.css'
class Listitem extends Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }
  playMusic (musicItem) {
    Pubsub.publish('PLAY_MUSIC', musicItem)
  }
  deleteMusic (musicItem, e) {
    e.stopPropagation()
    Pubsub.publish('DELETE_MUSIC', musicItem)
  }
  render() {
    let musicItem = this.props.musicItem
    return (
      <li onClick={this.playMusic.bind(this, musicItem)} className={`listitem ${this.props.focus ? 'focus' : ''}`}>
        <p className="listitem-p"><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="listitem-p delete">X</p>
      </li>
    );
  }
}

export default Listitem;
