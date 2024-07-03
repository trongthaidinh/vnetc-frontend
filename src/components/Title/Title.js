import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Title.module.scss';

const cx = classNames.bind(styles);

function Title({ text, showSeeAll, onSeeAllClick }) {
    return (
        <div className={cx('header')}>
            <span className={cx('title')}>{text}</span>
            {showSeeAll && (
                <button className={cx('see-all')} onClick={onSeeAllClick}>
                    Xem tất cả
                </button>
            )}
            <div className={cx('line')} />
        </div>
    );
}

Title.propTypes = {
    text: PropTypes.string.isRequired,
    showSeeAll: PropTypes.bool,
    onSeeAllClick: PropTypes.func,
};

Title.defaultProps = {
    showSeeAll: false,
    onSeeAllClick: () => {},
};

export default Title;
