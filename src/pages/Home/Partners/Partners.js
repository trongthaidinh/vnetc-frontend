import React, { useState, useEffect } from 'react';
import styles from './Partners.module.scss';
import classNames from 'classnames/bind';
import { getPartners } from '~/services/partnerService';
import Title from '~/components/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

SwiperCore.use([Autoplay]);

const cx = classNames.bind(styles);

function Partners() {
    const [partnersArr, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đối tác" />
                <div className={cx('slide-container')}>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={5}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        className={styles.swiper}
                    >
                        {partnersArr.map((partner, index) => (
                            <SwiperSlide key={index} className={cx('slide')}>
                                <div className={cx('partner-card')}>
                                    <img src={partner.imageUrl} alt={partner.name} className={cx('partner-image')} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Partners;
