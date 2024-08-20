import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon, children }) {
    return (
        <div className={cx('menu-item')}>
            <NavLink to={to} className={(navData) => cx('menu-item-link', { active: navData.isActive })}>
                <span className={cx('icon')}>{icon}</span>
                <span className={cx('title')}>{title}</span>
                {children && <div className={cx('submenu')}>{children}</div>}
            </NavLink>
        </div>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node,
    activeIcon: PropTypes.node,
    children: PropTypes.node,
};

export default MenuItem;
