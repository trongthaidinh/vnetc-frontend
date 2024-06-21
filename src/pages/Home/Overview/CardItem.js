import React from 'react';
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardItem({ image, title, link, alt }) {
    return (
        <Link to={link} className={cx('card-item')}>
            <img className={cx('card-item-image')} src={image} alt={alt} />
            <div className={cx('card-item-overlay')}>
                <span className={cx('card-item-title')}>{title}</span>
            </div>
        </Link>
    );
}

export default CardItem;
