import React, { useEffect, useState, useCallback } from 'react';
import styles from './Banner.module.scss';
import { getConfiguration } from '~/services/configurationService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

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
        <div className={styles.banner}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div className={styles.imageCard}>
                            <img src={slide.image_url} alt={slide.title} className={styles.image} />
                            <div className={`${styles.contentContainer} ${styles[slide.position]}`}>
                                <div className={styles.textWrapper}>
                                    <span className={styles.text}>{slide.title}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
