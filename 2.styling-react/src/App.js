import React, { Component } from 'react';
import StyledButton from './components/StyledButton';


class App extends Component {
  render() {

    return (
      <div>
        <StyledButton big>버튼</StyledButton>
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import classNames from 'classnames/bind';
// import styles from './App.scss';


// const cx = classNames.bind(styles);

// class App extends Component {
//   render() {
//     const isBlue = true;

//     return (
//       <div className={cx('box', {
//         blue: isBlue})}>
//         <div className={cx('box-inside')}></div>
//         <div><Button>버튼</Button></div>
//       </div>
//     );
//   }
// }

// export default App;
