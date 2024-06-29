import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumb.module.sass';

const cx = classNames.bind(styles);

const Breadcrumb = ({ items }) => {
    return (
        <nav className={cx('breadcrumb')}>
            {items.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < items.length - 1 && ' > '}
                </span>
            ))}
        </nav>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Breadcrumb;
