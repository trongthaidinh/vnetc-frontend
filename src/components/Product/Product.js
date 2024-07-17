import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Product({ image, name, productId, category }) {
    const getProductLink = (category, productId) => {
        return `/san-pham/${category}/${productId}`;
    };

    return (
        <div className={cx('product-item')}>
            <img className={cx('product-item-image')} src={image} alt={name} />
            <div className={cx('product-item-details')}>
                <h2 className={cx('product-item-name')}>{name}</h2>
                <Link to={getProductLink(category, productId)}>
                    <Button outline className={cx('product-item-button')}>
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
    );
}

Product.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default Product;
