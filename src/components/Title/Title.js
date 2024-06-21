// Title.js

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Title.module.scss';

const cx = classNames.bind(styles);

function Title({ text }) {
    return (
        <div className={cx('header')}>
            <span className={cx('title')}>{text}</span>
            <div className={cx('line')} />
        </div>
    );
}

export default Title;
