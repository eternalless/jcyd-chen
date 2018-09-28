import React, { Component } from 'react';
import './index.css'
class Header extends Component {
  render() {
    return (
      <div className="component-header">
        <img src="/images/logo.png" alt=""/>
        <h1 className="header-caption">React Music Player</h1>
      </div>
    );
  }
}

export default Header;
