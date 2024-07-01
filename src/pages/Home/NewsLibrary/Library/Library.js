import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Library.module.scss';
import { getProjects } from '~/services/libraryService';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function Library() {
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const buttons1 = ['Video'];

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
                const data = await getProjects();
                const updatedData = data.map((item) => ({
                    ...item,
                    link: extractVideoId(item.link),
                }));
                setLibrary(updatedData);
                setActiveVideo(updatedData[0].link);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const handleThumbnailClick = (link) => {
        setActiveVideo(link);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Thư viện" />
                <ButtonGroup buttons={buttons1} />
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
                    <div className={cx('thumbnails')}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={12}
                            slidesPerView={3}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                        >
                            {library.slice(1).map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={cx('thumbnail')} onClick={() => handleThumbnailClick(item.link)}>
                                        <img
                                            src={getThumbnailUrl(item.link)}
                                            alt={`Thumbnail of ${item.title}`}
                                            width="180"
                                            height="100"
                                            className={cx('thumbnail-image')}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
