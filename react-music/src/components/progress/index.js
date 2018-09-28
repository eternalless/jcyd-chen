import React, { Component } from 'react';
import './index.css'
class Progress extends Component {
  constructor(props){
    super(props)
    this.state = {
      barColor: '#00B7FF'
    };
  }

  static defaultProps = {
    barColor: '#00B7FF'
  }
      changeProgress(e){
    var progressBar = this.refs.progressBar
    var progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    console.log(progress)
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
  render() {
    return (
      <div className="component-progress" ref="progressBar"  onClick={this.changeProgress.bind(this)}>
        <div  className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}> </div>
      </div>
    );
  }
}

export default Progress;
