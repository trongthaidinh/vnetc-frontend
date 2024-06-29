import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import DateTime from '~/components/DateTime';
import styles from './SuggestCard.module.scss';

const cx = classNames.bind(styles);

function SuggestCard({
    title = 'Default Title',
    image = 'default.jpg',
    link = '/default-link',
    description = 'Mô tả gợi ý',
    createdAt = Date.now(),
}) {
    return (
        <div className={cx('suggest-card')}>
            <Link to={link} className={cx('image-wrapper')}>
                <img src={image} alt={title} className={cx('image')} />
            </Link>
            <div className={cx('content')}>
                <Link to={link} className={cx('title-link')}>
                    <h3 className={cx('title')}>{title}</h3>
                </Link>
                <p className={cx('card-description')}>{description}</p>
                <DateTime timestamp={createdAt} showDate={true} showTime={true} showReaders={false} />
            </div>
        </div>
    );
}

SuggestCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
};

export default SuggestCard;
