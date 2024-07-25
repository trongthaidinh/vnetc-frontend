import React, { useState, useEffect, useRef } from 'react';
import styles from './Teams.module.scss';
import classNames from 'classnames/bind';
import { getDepartmentMembers, getDepartments } from '~/services/teamService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import ButtonGroup from '~/components/ButtonGroup';
import TeamModal from '~/components/TeamModal';

const cx = classNames.bind(styles);

function Teams() {
    const [departments, setDepartments] = useState([]);
    const [teamsArr, setTeams] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlides, setCurrentSlides] = useState({});
    const [slidesPerView, setSlidesPerView] = useState(4);
    const [selectedTeam, setSelectedTeam] = useState(null); // Trạng thái modal
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
    }, [currentSlides, teamsArr, slidesPerView]);

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
    }, [slidesPerView]);

    const translateValue = 100 / slidesPerView;

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const handleOpenDetail = (team) => {
        setSelectedTeam(team);
    };

    const handleCloseDetail = () => {
        setSelectedTeam(null);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đội ngũ" />
                {departments.map((department) => (
                    <div key={department._id} className={cx('department-section')}>
                        <ButtonGroup buttons={[department.name]} />
                        <div className={cx('slide-container')} ref={(el) => (sliderRefs.current[department._id] = el)}>
                            <div
                                className={cx('slide-wrapper')}
                                style={{
                                    transform: `translateX(-${currentSlides[department._id] * translateValue}%)`,
                                    transition: 'transform 0.5s ease',
                                }}
                            >
                                {teamsArr[department._id]?.map((team, index) => (
                                    <div key={index} className={cx('slide')} onClick={() => handleOpenDetail(team)}>
                                        <div className={cx('team-card')}>
                                            <img src={team.image} alt={team.name} className={cx('team-image')} />
                                            <div className={cx('team-info')}>
                                                <h3 className={cx('team-name')}>{team.name}</h3>
                                                <p className={cx('team-position')}>{team.qualification}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <TeamModal visible={!!selectedTeam} onClose={handleCloseDetail} team={selectedTeam} />
        </div>
    );
}

export default Teams;
