import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ServiceDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import Title from '~/components/Title';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getServiceById } from '~/services/serviceService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceDetail, setServiceDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

    useEffect(() => {
        const fetchServiceDetail = async (serviceId) => {
            try {
                const data = await getServiceById(serviceId);
                setServiceDetail(data);
                console.log(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching service detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail(id);
    }, [id]);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? serviceDetail.image.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === serviceDetail.image.length - 1 ? 0 : prevIndex + 1));
    };

    const handleThumbnailPrevClick = () => {
        setThumbnailStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleThumbnailNextClick = () => {
        const totalImages = serviceDetail.image.length;
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
            <Helmet>
                <title>{serviceDetail.name} | VNETC</title>
                <meta name="description" content={`Chi tiết về sản phẩm: ${serviceDetail.name}.`} />
                <meta name="keywords" content={`sản phẩm, ${serviceDetail.name}, VNETC`} />
            </Helmet>
            <div className={cx('service-section')}>
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
                        {serviceDetail.image.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((image, index) => (
                            <div key={thumbnailStartIndex + index} className={cx('thumbnail-item')}>
                                <img
                                    className={cx('thumbnail-image')}
                                    src={image}
                                    alt={`${serviceDetail.name} thumbnail ${thumbnailStartIndex + index + 1}`}
                                    onClick={() => handleThumbnailClick(thumbnailStartIndex + index)}
                                />
                            </div>
                        ))}
                    </div>
                    {thumbnailStartIndex + 4 < serviceDetail.image.length && (
                        <button
                            className={cx('thumbnail-button', 'thumbnail-next-button')}
                            onClick={handleThumbnailNextClick}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    )}
                </div>

                <div className={cx('service-image')}>
                    <button className={cx('prev-button')} onClick={handlePrevClick}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div
                        className={cx('main-image-wrapper')}
                        style={{ transform: `translateX(-${currentImageIndex * 600}px)` }}
                    >
                        {serviceDetail.image.map((image, index) => (
                            <img
                                key={index}
                                className={cx('main-image')}
                                src={image}
                                alt={`${serviceDetail.name} main ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button className={cx('next-button')} onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                <div className={cx('service-details')}>
                    <h2 className={cx('service-name')}>{serviceDetail.name}</h2>
                    <p className={cx('service-info')}>
                        <span className={cx('label')}>Thương hiệu</span>
                        <span>:</span>
                        <span>{serviceDetail.detail[0].brand}</span>
                    </p>
                    <p className={cx('service-info')}>
                        <span className={cx('label')}>Kích cỡ</span>
                        <span>:</span>
                        <span>{serviceDetail.detail[0].size}</span>
                    </p>
                    <p className={cx('service-info')}>
                        <span className={cx('label')}>Trọng lượng</span>
                        <span>:</span>
                        <span>{serviceDetail.detail[0].weight} Kg</span>
                    </p>
                    <p className={cx('service-info')}>
                        <span className={cx('label')}>Bảo hành</span>
                        <span>:</span>
                        <span>{serviceDetail.detail[0].warranty} năm</span>
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
                    dangerouslySetInnerHTML={{ __html: serviceDetail.detail[0].content }}
                />
            </div>
        </article>
    );
};

export default ServiceDetail;
