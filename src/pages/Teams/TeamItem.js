import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Teams.module.scss';

const cx = classNames.bind(styles);

const TeamItem = ({ imageUrl, name, position, onClick }) => {
    return (
        <div className={cx('teamItem')} onClick={onClick}>
            <div className={cx('imageWrapper')}>
                <img src={imageUrl} alt={`${name}`} className={cx('image')} />
            </div>
            <div className={cx('infoWrapper')}>
                <p className={cx('name')}>{name}</p>
                <p className={cx('position')}>{position}</p>
            </div>
        </div>
    );
};

TeamItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};

export default TeamItem;
