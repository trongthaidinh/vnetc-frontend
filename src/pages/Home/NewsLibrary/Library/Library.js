import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getImages, getVideos } from '~/services/libraryService';
import Title from '~/components/Title';
import Modal from './ModalLibrary';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Library.module.scss';
import ButtonGroup from '~/components/ButtonGroup';

const cx = classNames.bind(styles);

function Library() {
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [, setModalContentType] = useState(null);

    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const [videoData, imageData] = await Promise.all([getVideos(), getImages()]);
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

    const getThumbnailUrl = (videoId) => {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    const handleVideoClick = (videoLink) => {
        setActiveVideo(videoLink);
    };

    const handleImageClick = (imageSrc) => {
        setActiveImage(imageSrc);
        setModalContentType('image');
    };

    const videoSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
    };

    const imageSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: 'ease-in-out',
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Thư viện" />
                <ButtonGroup buttons={['Video']} isStatic={true} />
                <div className={cx('library')}>
                    {activeVideo && (
                        <div className={cx('main-video')}>
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Main Video"
                            />
                        </div>
                    )}
                    <Slider {...videoSettings}>
                        {videos.map((item, index) => (
                            <div key={index} className={cx('thumbnail')} onClick={() => handleVideoClick(item.link)}>
                                <img
                                    src={getThumbnailUrl(item.link)}
                                    alt={item.title}
                                    className={cx('thumbnail-image')}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <ButtonGroup buttons={['Hình ảnh']} isStatic={true} />
                <div className={cx('library')}>
                    {activeImage && (
                        <div className={cx('main-image')}>
                            <img
                                src={activeImage}
                                alt="Main"
                                className={cx('main-image-content')}
                                onClick={() => {
                                    setModalContentType('image');
                                    setModalOpen(true);
                                }}
                            />
                        </div>
                    )}
                    <Slider {...imageSettings}>
                        {images.map((image, index) => (
                            <div key={index} className={cx('thumbnail')} onClick={() => handleImageClick(image.image)}>
                                <img
                                    src={image.image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={cx('thumbnail-image')}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <img src={activeImage} alt="Modal" className={cx('modal-image')} />
            </Modal>
        </div>
    );
}

export default Library;
