import React, { Component } from 'react';
import './App.css';
import test from './test.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: [],
    }
  }

  async componentDidMount() {
    await this.setState((state) => ({
      testData: state.testData.concat(test)
    }));
  }

  sido = () => {
    // 시도만 골라낸다
    const a = this.state.testData.map(val => {
      return val.sido;
    });
    // 시도중 중복값을 골라낸다.
    const b = a.filter((val, idx, arr) => {
      return arr.indexOf(val) === idx;
    });

    return b;
  }

  gugun = () => {
    const a = this.sido();

    // 같은 시도에 솎한 중복값을 묶어낸다.
    const b =  a.map(val => {
      let testVal = val;
      return this.state.testData.filter(val => {
        return val.sido === testVal;
      })
    })
    return b
  }
  
  delete = async (value) => {
    await this.setState((state) => ({
      testData: state.testData.filter((val, idx) => val !== value)
    }))
  }


  render() {

    const thSido = this.sido().map((val, idx) => {
      return (
        <th key={idx}>{val}</th>
      )
    });

    const tdGugun = this.gugun().map((val, idx) => {
      return (
        <td key={idx}>
          {
            val.map((val, idx) => (
              <span key={idx} onClick={() => this.delete(val)}>
                {val.sido}{val.gugun}
                <a>삭제</a><br/>
              </span>
            ))
          }
        </td>
      )
    });
    
    return (
      <div id="app">
        <table>
          <thead>
            <tr>
              { thSido }
            </tr>
          </thead>
          <tbody>
            <tr>
              { tdGugun }
            </tr>
          </tbody>
        </table>
        <button onClick={this.anotherList}>test</button>
      </div>
    )
  }
}

export default App;