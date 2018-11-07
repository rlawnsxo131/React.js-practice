import React, { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
import FunctionComponent from './FunctionComponent';

//랜덤 색상을 생성한다.
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000'
  }

  handleClick= () => {
    this.setState({
      color: getRandomColor()
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>  
        <LifeCycleSample color={this.state.color} />
        <FunctionComponent name="juntae"/>
      </div>
    )
  }
}

export default App;
