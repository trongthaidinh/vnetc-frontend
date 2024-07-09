import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Banner.module.scss';
import { getConfiguration } from '~/services/configurationService';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [slideTrigger, setSlideTrigger] = useState(false);
    const slideIntervalRef = useRef(null);

    const fetchSlides = useCallback(async () => {
        try {
            const configData = await getConfiguration();
            const sliderData = JSON.parse(configData[0].homepage_slider);
            setSlides(sliderData);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setSlideTrigger(true);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
        setSlideTrigger(true);
    }, [slides.length]);

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
        fetchSlides();
    }, [fetchSlides]);

    useEffect(() => {
        if (slides.length > 0) {
            startSlideInterval();
            return () => {
                stopSlideInterval();
            };
        }
    }, [slides, startSlideInterval, stopSlideInterval]);

    useEffect(() => {
        if (slideTrigger) {
            clearInterval(slideIntervalRef.current);
            startSlideInterval();
        }
    }, [slideTrigger, startSlideInterval]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <div className={styles.banner}>
            <div className={styles.slidesContainer} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={slide.Id} className={styles.slide}>
                        <img src={slide.image_url} alt={slide.title} className={styles.image} />
                        <div className={`${styles.contentContainer} ${styles[slide.position]}`}>
                            <div className={styles.textWrapper}>
                                <span className={styles.text}>{slide.title}</span>
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
                {slides.map((_, index) => (
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
