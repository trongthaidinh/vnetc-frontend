import React, { useState, useEffect, useRef } from 'react';
import styles from './Teams.module.scss';
import classNames from 'classnames/bind';
import { getTeams } from '~/services/teamService';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function Teams() {
    const [teamsArr, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(4);

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

    useEffect(() => {
        if (!loading && teamsArr.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % teamsArr.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [loading, teamsArr]);

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
                <Title text="Đội ngũ" />
                <ButtonGroup buttons={buttons} />
                <div className={cx('slide-container')} ref={sliderRef}>
                    <div
                        className={cx('slide-wrapper')}
                        style={{ transform: `translateX(-${currentSlide * translateValue}%)` }}
                    >
                        {teamsArr.map((team, index) => (
                            <div key={index} className={cx('slide')} onClick={() => handleSlideChange(index)}>
                                <div className={cx('team-card')}>
                                    <img src={team.image} alt={team.name} className={cx('team-image')} />
                                    <div className={cx('team-info')}>
                                        <h3 className={cx('team-name')}>{team.name}</h3>
                                        <p className={cx('team-position')}>{team.position}</p>
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

export default Teams;
