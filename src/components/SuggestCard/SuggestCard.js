import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DateTime from '~/components/DateTime';
import styles from './SuggestCard.module.scss';

const cx = classNames.bind(styles);

function SuggestCard({
    title = 'Default Title',
    image = 'https://res.cloudinary.com/ddmzboxzu/image/upload/v1724202469/cer_3_ldetgd.png',
    summary = 'Mô tả gợi ý',
    createdAt = Date.now(),
}) {
    return (
        <div className={cx('suggest-card')}>
            <div className={cx('image-wrapper')}>
                <img src={image} alt={title} className={cx('image')} />
            </div>
            <div className={cx('content')}>
                <div className={cx('title-link')}>
                    <h3 className={cx('title')}>{title}</h3>
                </div>
                <p className={cx('card-description')}>{summary}</p>
                <DateTime timestamp={createdAt} showDate={true} showTime={true} showViews={false} />
            </div>
        </div>
    );
}

SuggestCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default SuggestCard;
