import React, { useState, useEffect, useRef } from 'react';
import styles from './Teams.module.scss';
import classNames from 'classnames/bind';
import { getDepartmentMembers, getDepartments } from '~/services/teamService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import ButtonGroup from '~/components/ButtonGroup';
import positionTitles from '~/constants/PositionTitle';

const cx = classNames.bind(styles);

function Teams() {
    const [departments, setDepartments] = useState([]);
    const [teamsArr, setTeams] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlides, setCurrentSlides] = useState({});
    const [slidesPerView, setSlidesPerView] = useState(4);
    const sliderRefs = useRef({});

    useEffect(() => {
        const loadTeams = async () => {
            setLoading(true);
            try {
                const departments = await getDepartments();
                setDepartments(departments);

                const allTeams = {};
                const slides = {};
                for (const department of departments) {
                    const members = await getDepartmentMembers(department._id);
                    allTeams[department._id] = members;
                    slides[department._id] = 0;
                }
                setTeams(allTeams);
                setCurrentSlides(slides);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    useEffect(() => {
        const intervals = Object.keys(currentSlides).map((departmentId) => {
            return setInterval(() => {
                setCurrentSlides((prevSlides) => ({
                    ...prevSlides,
                    [departmentId]: (prevSlides[departmentId] + 1) % (teamsArr[departmentId]?.length || 1),
                }));
            }, 2000);
        });

        return () => intervals.forEach(clearInterval);
    }, [currentSlides, teamsArr]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1280) {
                setSlidesPerView(4);
            } else if (window.innerWidth >= 1024) {
                setSlidesPerView(3);
            } else if (window.innerWidth >= 768) {
                setSlidesPerView(2);
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

    const handleSlideChange = (departmentId, index) => {
        setCurrentSlides((prevSlides) => ({
            ...prevSlides,
            [departmentId]: index,
        }));
    };

    const translateValue = 100 / slidesPerView;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đội ngũ" />
                {departments.map((department) => (
                    <div key={department._id}>
                        <ButtonGroup buttons={[department.name]} />
                        <div className={cx('slide-container')} ref={(el) => (sliderRefs.current[department._id] = el)}>
                            <div
                                className={cx('slide-wrapper')}
                                style={{ transform: `translateX(-${currentSlides[department._id] * translateValue}%)` }}
                            >
                                {teamsArr[department._id]?.map((team, index) => (
                                    <div
                                        key={index}
                                        className={cx('slide')}
                                        onClick={() => handleSlideChange(department._id, index)}
                                    >
                                        <div className={cx('team-card')}>
                                            <img src={team.image} alt={team.name} className={cx('team-image')} />
                                            <div className={cx('team-info')}>
                                                <h3 className={cx('team-name')}>{team.name}</h3>
                                                <p className={cx('team-position')}>{positionTitles[team.position]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teams;
