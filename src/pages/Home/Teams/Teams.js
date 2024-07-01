import React, { useState, useEffect } from 'react';
import styles from './Teams.module.scss';
import classNames from 'classnames/bind';
import { getTeams } from '~/services/teamService';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

SwiperCore.use([Autoplay]);

const cx = classNames.bind(styles);

function Teams() {
    const [teamsArr, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buttons = ['Ban lãnh đạo', 'Đội công trình'];

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
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
                <Title text="Đội ngũ" />
                <ButtonGroup buttons={buttons} />
                <div className={cx('slide-container')}>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        className={styles.swiper}
                    >
                        {teamsArr.map((team, index) => (
                            <SwiperSlide key={index} className={cx('slide')}>
                                <div className={cx('team-card')}>
                                    <img src={team.image} alt={team.name} className={cx('team-image')} />
                                    <div className={cx('team-info')}>
                                        <h3 className={cx('team-name')}>{team.name}</h3>
                                        <p className={cx('team-position')}>{team.position}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Teams;
