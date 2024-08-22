import classNames from 'classnames/bind';
import styles from './CardDocument.module.scss';
import React from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Card({
    title = 'Default Title',
    summary = 'Default Sumary',
    image = 'https://res.cloudinary.com/ddmzboxzu/image/upload/v1724202469/cer_3_ldetgd.png',
}) {
    return (
        <div className={cx('card')}>
            <div className={cx('card_image-wrapper')}>
                <img src={image} alt={title} className={cx('card_image')} />
            </div>
            <div className={cx('card_content')}>
                <h3 className={cx('card_title')}>{title}</h3>
                <p className={cx('card_description')}>{summary}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default Card;
