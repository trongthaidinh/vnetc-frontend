import React, { useEffect, useState } from 'react';
import TeamItem from './TeamItem';
import { getTeams } from '~/services/teamService';
import classNames from 'classnames/bind';
import styles from './Teams.module.scss';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

const TeamPage = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className={cx('teamPage')}>
            <Title text="Ban Lãnh Đạo" />
            <div className={cx('teamGrid')}>
                {teams.map((team, index) => (
                    <TeamItem
                        key={team.id}
                        imageUrl={team.image}
                        gender={team.gender}
                        name={team.name}
                        position={team.position}
                    />
                ))}
            </div>
        </div>
    );
};

export default TeamPage;
