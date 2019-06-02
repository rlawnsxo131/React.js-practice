import React from 'react';

export const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log('delay 2sec'));
    }, 2000);
  });
}

const LazyComponent = () => {
  return <div>Lazy</div>
}

export default LazyComponent;
