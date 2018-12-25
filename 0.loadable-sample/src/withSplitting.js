import React, { Component } from 'react';

const withSplitting = getComponent => {
  // 여기서 getComponent 는 () = import('./SplitMe') 의 형태로 함수가 전달되어야 한다.
  class WithSplitting extends Component {
    static Splitted = null; // 기본 값은 null 이지만
    static preload() {
      // preload가 호출되면 위 static Splitted가 설정되고
      getComponent().then(({ default: Splitted }) => {
        WithSplitting.Splitted = Splitted;
      });
    }
    state = {
      Splitted: WithSplitting.Splitted // 컴포넌트가 생성되는 시점에서 static Splitted를 사용하게 되므로 null이나 컴포넌트를 사용하게 됨
    };

    constructor(props) {
      super(props);
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return < Splitted {...this.props} />;
    }
  }

  return WithSplitting;
};

export default withSplitting;



