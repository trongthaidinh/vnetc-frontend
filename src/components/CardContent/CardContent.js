import classNames from 'classnames/bind';
import styles from './CardContent.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DateTime from '~/components/DateTime';

const cx = classNames.bind(styles);

function Card({ title, description, image, link, createdAt, readers }) {
    return (
        <div className={cx('card')}>
            <Link to={link}>
                <div className={cx('card_image-wrapper')}>
                    <img src={image} alt={title} className={cx('card_image')} />
                </div>
            </Link>
            <div className={cx('card_content')}>
                <Link to={link} className={cx('card_title-link')}>
                    <h3 className={cx('card_title')}>{title}</h3>
                </Link>
                <p className={cx('card_description')}>{description}</p>
                <DateTime timestamp={createdAt} readers={readers} showDate={true} showTime={true} showReaders={true} />
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    readers: PropTypes.number.isRequired,
};

export default Card;
