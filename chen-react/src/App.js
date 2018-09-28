import React, { Component } from 'react';
import './App.css';
var Style = {
  color: 'red',
  'fontSize': 16
}
class App extends Component {
  constructor(props){
    super(props)
    this.state = {value: 'Hello Runoob!'};
    this.handleChange = this.handleChange.bind(this);
    console.log("---初始化组件---")
  }
  componentWillMount(){
    console.log("---组件挂载前---")
  }

  componentDidMount(){
    console.log("---组件被渲染到页面中完成---")
  }
  componentWillReceiveProps(nextProps){
    console.log("---父组件重新渲染---",nextProps)
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log("---组件接受到重绘状态---")
    console.log(nextProps)
    if(this.props !== nextProps || this.state !== nextState)
      return true
  }
  componentWillUnMount(){
    console.log("-------------------------")
  }
  handleChange(e) {
    console.log(e.target.value)
    this.setState({value: e.target.value})
  }
  handle(e) {
   console.log(e.target)
  }

  render() {
    var value = this.state.value;
    return (
    <div style={Style}>{this.props.name}
      <input type="text" value={value} onChange={this.handleChange}/>
      <input type="text" value={value} onChange={this.handleChange}/>
    <h1 onClick={this.handle}>11</h1></div>
    );
  }
}
// App.defaultProps = {//类的静态属性
//   name: 'sf'
// }
export default App;
