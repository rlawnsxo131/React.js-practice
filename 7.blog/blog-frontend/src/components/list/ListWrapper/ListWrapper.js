import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper = ({children}) => (
  <div classNames={cx('list-wrapper')}>
    {children}
  </div>
)

export default ListWrapper;
