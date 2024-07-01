import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './Banner.module.scss';
import images from '~/assets/images/slider';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideTrigger, setSlideTrigger] = useState(false);
    const slideIntervalRef = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        setSlideTrigger(true);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
        setSlideTrigger(true);
    }, []);

    const startSlideInterval = useCallback(() => {
        slideIntervalRef.current = setInterval(() => {
            nextSlide();
            setSlideTrigger(false);
        }, 5000);
    }, [nextSlide]);

    const stopSlideInterval = useCallback(() => {
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
        }
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setSlideTrigger(true);
    };

    useEffect(() => {
        startSlideInterval();
        return () => {
            stopSlideInterval();
        };
    }, [startSlideInterval, stopSlideInterval]);

    useEffect(() => {
        if (slideTrigger) {
            clearInterval(slideIntervalRef.current);
            startSlideInterval();
        }
    }, [slideTrigger, startSlideInterval]);

    return (
        <div className={styles.banner}>
            <div className={styles.slidesContainer} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className={styles.slide}>
                        <img src={image.imgURL} alt={image.imgAlt} className={styles.image} />
                        <div className={`${styles.hotlineContainer} ${styles[image.position]}`}>
                            <div className={styles.scrollTextWrapper}>
                                <span className={styles.scrollText}>
                                    <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                                    <span className={styles.label}>Hotline: </span>
                                    {image.hotline}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className={styles.pagination}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
