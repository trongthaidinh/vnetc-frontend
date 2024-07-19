import React, { useState, useEffect, useRef } from 'react';
import styles from './Partners.module.scss';
import classNames from 'classnames/bind';
import { getPartners } from '~/services/partnerService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function Partners() {
    const [partnersArr, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(4);

    useEffect(() => {
        const loadPartners = async () => {
            try {
                const data = await getPartners();
                setPartners(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadPartners();
    }, []);

    useEffect(() => {
        if (!loading && partnersArr.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % partnersArr.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [loading, partnersArr]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1280) {
                setSlidesPerView(4);
            } else if (window.innerWidth >= 1024) {
                setSlidesPerView(3);
            } else if (window.innerWidth >= 768) {
                setSlidesPerView(2);
            } else if (window.innerWidth >= 480) {
                setSlidesPerView(1);
            } else {
                setSlidesPerView(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    const translateValue = 100 / slidesPerView;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đối tác" />
                <div className={cx('slide-container')} ref={sliderRef}>
                    <div
                        className={cx('slide-wrapper')}
                        style={{ transform: `translateX(-${currentSlide * translateValue}%)` }}
                    >
                        {partnersArr.map((partner, index) => (
                            <div key={index} className={cx('slide')} onClick={() => handleSlideChange(index)}>
                                <div className={cx('partner-card')}>
                                    <img src={partner.logo} alt={`Partner ${index}`} className={cx('partner-image')} />
                                    <div className={cx('partner-info')}>
                                        <p className={cx('partner-position')}>{partner.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partners;
