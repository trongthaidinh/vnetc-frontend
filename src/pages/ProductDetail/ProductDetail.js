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

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                // Simulated API call to fetch product detail by ID
                // Replace with actual API call once available
                const data = {
                    _id: '612f3b3c21e3e13e5f85ae04',
                    name: 'Máy biến áp',
                    image: 'https://blog.mecsu.vn/wp-content/uploads/2022/06/cong-dung-may-bien-ap.jpg',
                    description: 'Product description goes here...',
                    category: 'Category Name',
                    status: true,
                    code: '#123456',
                    warranty: '1 năm',
                    createdAt: '2023-01-01T12:00:00Z',
                    updatedAt: '2023-01-01T13:00:00Z',
                    content: `
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        <br />
                            <h3>Tính năng nổi bật:</h3>
                            <ul>
                                <li>Feature 1</li>
                                <li>Feature 2</li>
                                <li>Feature 3</li>
                            </ul>
                        <br />
                        <img src="https://www.vnetc.com.vn/assets/img/post/z4982216183705_fa134df795ac46d96e14c6bdf6d8ec2b.jpg" alt="Image 1" style="max-width: 100%;" />
                        <br />
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br />
                        <img src="https://www.vnetc.com.vn/assets/img/post/z4982216183705_fa134df795ac46d96e14c6bdf6d8ec2b.jpg" alt="Image 2" style="max-width: 100%;" />
                        <br />
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br />
                        <br />
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                `,
                    details: {
                        dimensions: '10 x 5 x 3 inches',
                        weight: '1.5 lbs',
                        color: 'Black',
                        material: 'Plastic',
                        features: ['Feature 1', 'Feature 2', 'Feature 3'],
                        videos: [
                            {
                                url: 'https://www.youtube.com/watch?v=KKk_0lQmxVs',
                                title: 'Product Video 1',
                            },
                            {
                                url: 'https://www.youtube.com/watch?v=KKk_0lQmxVs',
                                title: 'Product Video 2',
                            },
                        ],
                        images: [
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx3RY5TpOamiI_V6JQ6AhFxJYt89BmeaiPVjwZE7HP90ujfQGLYtBWriK-6qTtfBNv5cQ&usqp=CAU',
                            'https://blog.mecsu.vn/wp-content/uploads/2022/06/cong-dung-may-bien-ap.jpg',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA-IQQfJMvSfMt0TReC45dAHhJ_dqp7v6QUA&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aAZh29nCrDJVG6zgA_UnnUtnxHKqO7hcEA&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMeqRwB4RozEn4jeP_LrJtyBaqnfFtCCZVA&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzDT_gJzbNwPNQLcTn5Y9XFG1s_SYebIxQQA&s',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvNiBEHPbUcWdH3FhW9oE3_XgiS1u8w7aoA&s',
                        ],
                    },
                };
                setProductDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productDetail.details.images.length - 1 : prevIndex - 1,
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productDetail.details.images.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const handleThumbnailPrevClick = () => {
        setThumbnailStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleThumbnailNextClick = () => {
        const totalImages = productDetail.details.images.length;
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
                        style={{ transform: `translateY(-${thumbnailStartIndex * 150}px)` }}
                    >
                        {productDetail.details.images
                            .slice(thumbnailStartIndex, thumbnailStartIndex + 4)
                            .map((image, index) => (
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
                    {thumbnailStartIndex + 4 < productDetail.details.images.length && (
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
                        {productDetail.details.images.map((image, index) => (
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
                        <span className={cx('label')}>Trạng thái</span>
                        <span>:</span>
                        <span>{productDetail.status ? 'Còn hàng' : 'Hết hàng'}</span>
                    </p>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Mã sản phẩm</span>
                        <span>:</span>
                        <span>{productDetail.code}</span>
                    </p>
                    <p className={cx('product-info')}>
                        <span className={cx('label')}>Bảo hành</span>
                        <span>:</span>
                        <span>{productDetail.warranty}</span>
                    </p>
                    <Button className={cx('contact-button')} primary>
                        Liên hệ
                    </Button>
                </div>
            </div>
            <div className={cx('info-section')}>
                <Title text="Thông tin sản phẩm" />
                <div className={cx('info-content')} dangerouslySetInnerHTML={{ __html: productDetail.content }} />
            </div>
        </article>
    );
};

export default ProductDetail;
