import React, { useState, lazy, Suspense } from 'react';
import { delay } from './LazyComponent';

//function
const Count1 = React.memo(function Count1(props) {
  console.log('render1');
  return <div>{props.count}</div>
});

//arrow function
const Count2 = React.memo((props) => {
  console.log('render2');
  return <div>{props.count}</div>
});

//Wrapping
const Count3 = props => {
  console.log('render3');
  return <div>{props.count}</div>;
}
const WrappedCount = React.memo(Count3);

const LazyComponent = lazy(async() => {
  await delay();
  return import('./LazyComponent');
});

function App() {
  const [ count, setCount ] = useState(0);
  return (
    <div className="App">
      <Count1 count={count} />
      <Count2 count={count} />
      <WrappedCount count={count} />
      {/* +는 리렌더링, -는 리렌더링 안됨 */}
      <button onClick={() => setCount(value => value + 1)}>+</button>
      <button onClick={() => setCount(value => value)}>-</button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
