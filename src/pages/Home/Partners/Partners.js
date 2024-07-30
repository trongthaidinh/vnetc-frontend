import React, { useState, useEffect } from 'react';
import styles from './Partners.module.scss';
import classNames from 'classnames/bind';
import { getPartners } from '~/services/partnerService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

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
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    breakpoints={{
                        1280: { slidesPerView: 4 },
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        0: { slidesPerView: 1 },
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {partnersArr.map((partner, index) => (
                        <SwiperSlide key={index} className={cx('slide')}>
                            <div className={cx('partner-card')}>
                                <img src={partner.logo} alt={`Partner ${index}`} className={cx('partner-image')} />
                                <div className={cx('partner-info')}>
                                    <p className={cx('partner-position')}>{partner.position}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Partners;
