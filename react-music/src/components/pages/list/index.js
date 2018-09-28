import React, { Component } from 'react';
import ListItem from '../../listitem/index'
import './index.css'

class List extends Component {
  constructor(props){
    super(props)
    this.state = {

    };
  }
  render() {
    let listEle = null
    listEle = this.props.musicList.map((item) => {
      return (
        <ListItem
          focus = {item === this.props.currentMusicItem}
        key={item.id}
        musicItem={item}
      />
      )
    })
    return (
    <ul className='list-ul'>
      {listEle}
    </ul>
    );
  }
}

export default List;
