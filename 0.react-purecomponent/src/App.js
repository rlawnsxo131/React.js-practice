import React, { PureComponent } from 'react';

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      test: 1
    }
  }

  render () {
    console.log('render');
    return (
      <div className= "App">
        <button onClick={() => this.setState({ test: 1})}>
          rendering check!
        </button>
      </div>
    );
  }
}

export default App;
