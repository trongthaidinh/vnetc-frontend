import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Library.module.scss';
import { getImages, getVideos } from '~/services/libraryService';
import Title from '~/components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from '~/components/ButtonGroup';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Library() {
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    const getThumbnailUrl = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    useEffect(() => {
        const loadLibrary = async () => {
            setLoading(true);
            try {
                const [videoData, imageData] = await Promise.all([getVideos(), getImages()]);

                const updatedVideos = videoData.map((item) => ({
                    ...item,
                    link: extractVideoId(item.video),
                }));

                setVideos(updatedVideos);
                setImages(imageData);
                setActiveVideo(updatedVideos[0]?.link);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const totalItems = videos.length;
                if (prevIndex >= totalItems) {
                    sliderRef.current.style.transition = 'none';
                    return 0;
                }
                sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
                return prevIndex + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [videos.length]);

    const handleThumbnailClick = (link) => {
        setActiveVideo(link);
    };

    const handlePrevClick = () => {
        const totalItems = videos.length;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        const totalItems = videos.length;
        setCurrentIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
    };

    const visibleThumbnails = [...videos, ...videos.slice(0, 3)];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Thư viện" showSeeAll={true} slug={`${routes.library}`} />
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
                            onClick={handlePrevClick}
                        />
                        <div
                            className={cx('thumbnails')}
                            ref={sliderRef}
                            style={{
                                transform: `translateX(-${
                                    (currentIndex % (visibleThumbnails.length + 3)) * (100 / 3)
                                }%)`,
                            }}
                        >
                            {visibleThumbnails.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('thumbnail')}
                                    onClick={() => handleThumbnailClick(item.link)}
                                >
                                    <img
                                        src={getThumbnailUrl(item.link)}
                                        alt={`Thumbnail of ${item.title}`}
                                        className={cx('thumbnail-image')}
                                    />
                                </div>
                            ))}
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={cx('chevron', 'right')}
                            onClick={handleNextClick}
                        />
                    </div>
                </div>
                <ButtonGroup buttons={['Hình ảnh']} />
                <div className={cx('image-library')}>
                    {images.map((image, index) => (
                        <div key={index} className={cx('image-wrapper')}>
                            <img src={image.image} alt={`Image ${index + 1}`} className={cx('image')} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Library;
