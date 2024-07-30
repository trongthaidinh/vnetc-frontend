import React, { useState, useEffect } from 'react';
import styles from './Teams.module.scss';
import classNames from 'classnames/bind';
import { getDepartmentMembers, getDepartments } from '~/services/teamService';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import ButtonGroup from '~/components/ButtonGroup';
import TeamModal from '~/components/TeamModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const cx = classNames.bind(styles);

function Teams() {
    const [departments, setDepartments] = useState([]);
    const [teamsArr, setTeams] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [slidesPerView, setSlidesPerView] = useState(4);

    useEffect(() => {
        const loadTeams = async () => {
            setLoading(true);
            try {
                const departments = await getDepartments();
                setDepartments(departments);

                const allTeams = {};
                for (const department of departments) {
                    const members = await getDepartmentMembers(department._id);
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

    const handleOpenDetail = (team) => {
        setSelectedTeam(team);
    };

    const handleCloseDetail = () => {
        setSelectedTeam(null);
    };

    const handleButtonClick = (departmentId) => {
        setCurrentDepartment(departmentId);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Đội ngũ" />
                <div className={cx('slide-wrapper')}>
                    <ButtonGroup
                        buttons={departments.map((department) => department.name)}
                        onButtonClick={(index) => handleButtonClick(departments[index]._id)}
                    />
                    {currentDepartment && (
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={slidesPerView}
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
                            {teamsArr[currentDepartment]?.map((team, index) => (
                                <SwiperSlide key={index} className={cx('slide')} onClick={() => handleOpenDetail(team)}>
                                    <div className={cx('team-card')}>
                                        <img src={team.image} alt={team.name} className={cx('team-image')} />
                                        <div className={cx('team-info')}>
                                            <h3 className={cx('team-name')}>{team.name}</h3>
                                            <p className={cx('team-position')}>{team.qualification}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
            <TeamModal visible={!!selectedTeam} onClose={handleCloseDetail} team={selectedTeam} />
        </div>
    );
}

export default Teams;
