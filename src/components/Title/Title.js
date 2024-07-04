import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Title.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Title({ text, showSeeAll, slug }) {
    return (
        <div className={cx('header')}>
            <span className={cx('title')}>{text}</span>
            {showSeeAll && (
                <Link to={slug}>
                    <button className={cx('see-all')}>Xem tất cả</button>
                </Link>
            )}
            <div className={cx('line')} />
        </div>
    );
}

Title.propTypes = {
    text: PropTypes.string.isRequired,
    showSeeAll: PropTypes.bool,
};

Title.defaultProps = {
    showSeeAll: false,
};

export default Title;
