import React, { Component, createContext } from 'react';

const Context = createContext();

const {
    Provider,
    Consumer: AnotherConsumer
} = Context;

class AnotherConsumer extends Component {
  state = {
    number: 1
  }
  actions = {
    increment: () => {
      this.setState(
        ({number}) => ({ number: number + 1 })
      );
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

function useAnother(WrapperComponent) {
  return function UseAnother(props) {
    return (
      <AnotherConsumer>
        {
          ({ state, actions }) => (
            <WrapperComponent
              number={state.number}
              increment={actions.increment}
            />
          )
        }
      </AnotherConsumer>
    )
  }
}

export {
  AnotherProvider,
  AnotherConsumer,
  useAnother
}

