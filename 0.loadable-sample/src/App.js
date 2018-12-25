import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { About, Home } from './pages';

class App extends Component {
  handleMouseOver = () => {
    About.preload();
  };
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about" onMouseOver={this.handleMouseOver}>About</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
