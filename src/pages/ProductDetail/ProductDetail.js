import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import Title from '~/components/Title';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getProductById } from '~/services/productService';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetail = async (productId) => {
            try {
                const data = await getProductById(productId);
                setProductDetail(data);
                console.log(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail(id);
    }, [id]);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productDetail.image.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === productDetail.image.length - 1 ? 0 : prevIndex + 1));
    };

    const handleThumbnailPrevClick = () => {
        setThumbnailStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleThumbnailNextClick = () => {
        const totalImages = productDetail.image.length;
        const remainingImages = totalImages - (thumbnailStartIndex + 1);
        console.log(remainingImages);
        if (remainingImages > 0) {
            setThumbnailStartIndex((prevIndex) => prevIndex + 1);
        } else {
            setThumbnailStartIndex((prevIndex) => prevIndex + remainingImages);
        }
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <article className={cx('wrapper')}>
            <div className={cx('product-section')}>
                <div className={cx('thumbnails')}>
                    {thumbnailStartIndex > 0 && (
                        <button
                            className={cx('thumbnail-button', 'thumbnail-prev-button')}
                            onClick={handleThumbnailPrevClick}
                        >
                            <FontAwesomeIcon icon={faChevronUp} />
                        </button>
                    )}
                    <div
                        className={cx('thumbnail-list')}
                        style={{ transform: `translateY(-${thumbnailStartIndex * 155}px)` }}
                    >
                        {productDetail.image.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((image, index) => (
                            <div className={cx('thumbnail-item')}>
                                <img
                                    key={thumbnailStartIndex + index}
                                    className={cx('thumbnail-image')}
                                    src={image}
                                    alt={`${productDetail.name} thumbnail ${thumbnailStartIndex + index + 1}`}
                                    onClick={() => handleThumbnailClick(thumbnailStartIndex + index)}
                                />
                            </div>
                        ))}
                    </div>
                    {thumbnailStartIndex + 4 < productDetail.image.length && (
                        <button
                            className={cx('thumbnail-button', 'thumbnail-next-button')}
                            onClick={handleThumbnailNextClick}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    )}
                </div>

                <div className={cx('product-image')}>
                    <button className={cx('prev-button')} onClick={handlePrevClick}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div
                        className={cx('main-image-wrapper')}
                        style={{ transform: `translateX(-${currentImageIndex * 600}px)` }}
                    >
                        {productDetail.image.map((image, index) => (
                            <img
                                key={index}
                                className={cx('main-image')}
                                src={image}
                                alt={`${productDetail.name} main ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button className={cx('next-button')} onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                <div className={cx('product-details')}>
                    <h2 className={cx('product-name')}>{productDetail.name}</h2>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Thương hiệu</span>
                        <span>:</span>
                        <span>{productDetail.detail[0].brand}</span>
                    </p>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Kích cỡ</span>
                        <span>:</span>
                        <span>{productDetail.detail[0].size}</span>
                    </p>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Trọng lượng</span>
                        <span>:</span>
                        <span>{productDetail.detail[0].weight} Kg</span>
                    </p>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Bảo hành</span>
                        <span>:</span>
                        <span>{productDetail.detail[0].warranty} năm</span>
                    </p>
                    <Button className={cx('contact-button')} primary>
                        <a href="tel:02623977171">Liên hệ</a>
                    </Button>
                </div>
            </div>
            <div className={cx('info-section')}>
                <Title text="Thông tin sản phẩm" />
                <div
                    className={cx('info-content')}
                    dangerouslySetInnerHTML={{ __html: productDetail.detail[0].content }}
                />
            </div>
        </article>
    );
};

export default ProductDetail;
