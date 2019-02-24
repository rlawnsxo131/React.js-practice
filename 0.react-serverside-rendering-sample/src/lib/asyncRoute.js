import React from 'react';

export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    };
    
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    };
  };
};

/*asyncComponent 함수는 파라미터로 컴포넌트를 불러오는 함수를 받아와서 상태관리를 자동으로 해준다.
  그리고 스플리팅할 코드를 코드의 하단에 나와있는것처럼 불러와주면 된다.

  이 코드를 살펴보면, 함수 내에서 컴포넌트를 정의하고,
  componentWillMount에서 불러온 컴포넌트를 static 값으로 설정한다.
  이렇게 함으로서, 한번 불러왔던 컴포넌트가 언마운트 되어도, static 으로 설정한 값은 유지되기 때문에,
  나중에 컴포넌트가 마운트 될 때 초기 state 가 설정되면서 기존에 불러왔었던 컴포넌트를 사용하기 때문에
  파일을 다시 새로 불러오지 않아도 계속 사용 할 수 있다.
*/