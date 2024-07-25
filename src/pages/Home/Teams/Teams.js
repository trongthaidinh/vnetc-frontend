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
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(4);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [autoSlide, setAutoSlide] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        const loadTeams = async () => {
            setLoading(true);
            try {
                const departments = await getDepartments();
                setDepartments(departments);

                const allTeams = {};
                for (const department of departments) {
                    const members = await getDepartmentMembers(department._id);
                    members.sort((a, b) => b.name.localeCompare(a.name));
                    allTeams[department._id] = members;
                }
                if (departments.length > 0) {
                    setCurrentDepartment(departments[0]._id);
                }
                setTeams(allTeams);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

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

    useEffect(() => {
        if (currentDepartment) {
            const members = teamsArr[currentDepartment] || [];
            if (members.length > slidesPerView) {
                setAutoSlide(true);
            } else {
                setAutoSlide(false);
            }
        }
    }, [currentDepartment, teamsArr, slidesPerView]);

    useEffect(() => {
        let interval;
        if (autoSlide) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % (teamsArr[currentDepartment]?.length || 1));
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [autoSlide, currentDepartment, teamsArr, slidesPerView]);

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

    const handleButtonClick = (departmentId) => {
        setCurrentDepartment(departmentId);
        setCurrentSlide(0);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đội ngũ" />
                <ButtonGroup
                    buttons={departments.map((department) => department.name)}
                    onButtonClick={(index) => handleButtonClick(departments[index]._id)}
                />
                {currentDepartment && (
                    <div className={cx('slide-container')} ref={sliderRef}>
                        <div
                            className={cx('slide-wrapper')}
                            style={{
                                transform: `translateX(-${currentSlide * translateValue}%)`,
                                transition: 'transform 0.5s ease',
                            }}
                        >
                            {teamsArr[currentDepartment]?.map((team, index) => (
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
                )}
            </div>
            <TeamModal visible={!!selectedTeam} onClose={handleCloseDetail} team={selectedTeam} />
        </div>
    );
}

export default Teams;
