//예제용 코드 현재사용 X
import React, { Component } from 'react';

class AsyncSplitMe extends Component {
    state = {
        SplitMe: null
    }

    loadSplitMe = () => {
        //비동기적으로 코드를 불러온다. 함수는 Promise를 결과로 반환한다.
        //import()는 모듈의 전체 네임스페이스를 불러오므로, default를 직접 지정해야 한다.
        import('./SplitMe').then(({ default: SplitMe }) => {
            this.setState({
                SplitMe
            });
        });
    }

    render() {
        const { SplitMe } = this.state;
        //SplitMe가 있으면 이를 렌더링하고, 없으면 버튼을 렌더링한다.
        //버튼을 누르면 SplitMe를 불러온다.
        return SplitMe ? <SplitMe/> : <button onClick={this.loadSplitMe}>SplitMe 로딩</button>
    }
}

export default AsyncSplitMe;
