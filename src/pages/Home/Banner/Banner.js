import React, { useEffect, useState, useCallback } from 'react';
import { getConfiguration } from '~/services/configurationService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Banner = () => {
    const [slides, setSlides] = useState([]);

    const fetchSlides = useCallback(async () => {
        try {
            const configData = await getConfiguration();
            const sliderData = JSON.parse(configData.homepage_slider);
            setSlides(sliderData);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    }, []);

    useEffect(() => {
        fetchSlides();
    }, [fetchSlides]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <div className={cx('banner')}>
            <div className={cx('inner')}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    navigation={{
                        nextEl: `.${cx('swiper-button-next')}`,
                        prevEl: `.${cx('swiper-button-prev')}`,
                    }}
                    observer={true}
                    observeParents={true}
                    className={cx('swiper')}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className={cx('imageCard')}>
                                <img src={slide.image_url} alt={slide.title} className={cx('image')} />
                                <div className={cx('contentContainer', slide.position)}>
                                    <div className={cx('textWrapper')}>
                                        <span className={cx('text')}>{slide.title}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className={cx('swiper-button-prev')}>
                        <FontAwesomeIcon icon={faChevronLeft} className={cx('swiper-icon')} />
                    </div>
                    <div className={cx('swiper-button-next')}>
                        <FontAwesomeIcon icon={faChevronRight} className={cx('swiper-icon')} />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
