import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Library.module.scss';
import { getImagesPagination, getVideos } from '~/services/libraryService';
import Title from '~/components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from '~/components/ButtonGroup';

const cx = classNames.bind(styles);

function Library() {
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoSliderRef = useRef(null);
    const imageSliderRef = useRef(null);

    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    const getThumbnailUrl = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const [videoData, imageData] = await Promise.all([getVideos(), getImagesPagination()]);

                const updatedVideos = videoData.map((item) => ({
                    ...item,
                    link: extractVideoId(item.video),
                }));

                setVideos(updatedVideos);
                setImages(imageData);
                setActiveVideo(updatedVideos[0]?.link);
                setActiveImage(imageData[0]?.image);
            } catch (error) {
                console.error('Failed to load library data', error);
            }
        };

        loadLibrary();
    }, []);

    useEffect(() => {
        const videoInterval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => {
                const totalItems = videos.length;
                if (prevIndex >= totalItems) {
                    videoSliderRef.current.style.transition = 'none';
                    return 0;
                }
                videoSliderRef.current.style.transition = 'transform 0.5s ease-in-out';
                return prevIndex + 1;
            });
        }, 3000);

        return () => clearInterval(videoInterval);
    }, [videos.length]);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const totalItems = images.length;
                if (prevIndex >= totalItems) {
                    imageSliderRef.current.style.transition = 'none';
                    return 0;
                }
                imageSliderRef.current.style.transition = 'transform 0.5s ease-in-out';
                return prevIndex + 1;
            });
        }, 3000);

        return () => clearInterval(imageInterval);
    }, [images.length]);

    const handleThumbnailClick = (link) => {
        setActiveVideo(link);
    };

    const handleImageClick = (image) => {
        setActiveImage(image);
    };

    const handlePrevVideoClick = () => {
        const totalItems = videos.length;
        setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
    };

    const handleNextVideoClick = () => {
        const totalItems = videos.length;
        setCurrentVideoIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevImageClick = () => {
        const totalItems = images.length;
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
    };

    const handleNextImageClick = () => {
        const totalItems = images.length;
        setCurrentImageIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
    };

    const visibleVideoThumbnails = [...videos, ...videos.slice(0, 3)];
    const visibleImageThumbnails = [...images, ...images.slice(0, 3)];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Thư viện" />
                <ButtonGroup buttons={['Video']} />
                <div className={cx('library')}>
                    {activeVideo && (
                        <div className={cx('main-video')}>
                            <iframe
                                width="390"
                                height="200"
                                src={`https://www.youtube.com/embed/${activeVideo}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Main Video"
                            />
                        </div>
                    )}
                    <div className={cx('thumbnails-wrapper')}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={cx('chevron', 'left')}
                            onClick={handlePrevVideoClick}
                        />
                        <div
                            className={cx('thumbnails')}
                            ref={videoSliderRef}
                            style={{
                                transform: `translateX(-${
                                    (currentVideoIndex % (visibleVideoThumbnails.length + 3)) * (100 / 3)
                                }%)`,
                            }}
                        >
                            {visibleVideoThumbnails.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('thumbnail')}
                                    onClick={() => handleThumbnailClick(item.link)}
                                >
                                    <img
                                        src={getThumbnailUrl(item.link)}
                                        alt={item.title}
                                        className={cx('thumbnail-image')}
                                    />
                                </div>
                            ))}
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={cx('chevron', 'right')}
                            onClick={handleNextVideoClick}
                        />
                    </div>
                </div>
                <ButtonGroup buttons={['Hình ảnh']} />
                <div className={cx('library')}>
                    {activeImage && (
                        <div className={cx('main-image')}>
                            <img src={activeImage} alt="Main" className={cx('main-image-content')} />
                        </div>
                    )}
                    <div className={cx('thumbnails-wrapper')}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={cx('chevron', 'left')}
                            onClick={handlePrevImageClick}
                        />
                        <div
                            className={cx('thumbnails')}
                            ref={imageSliderRef}
                            style={{
                                transform: `translateX(-${
                                    (currentImageIndex % (visibleImageThumbnails.length + 3)) * (100 / 3)
                                }%)`,
                            }}
                        >
                            {visibleImageThumbnails.map((image, index) => (
                                <div
                                    key={index}
                                    className={cx('thumbnail')}
                                    onClick={() => handleImageClick(image.image)}
                                >
                                    <img
                                        src={image.image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={cx('thumbnail-image')}
                                    />
                                </div>
                            ))}
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={cx('chevron', 'right')}
                            onClick={handleNextImageClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
