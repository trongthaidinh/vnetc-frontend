import React, { useEffect, useState } from 'react';
import TeamItem from './TeamItem';
import Title from '~/components/Title';
import { getTeams } from '~/services/teamService';
import classNames from 'classnames/bind';
import styles from './Teams.module.scss';

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

    const teamTypes = [...new Set(teams.map((team) => team.type))];

    return (
        <div className={cx('teamPage')}>
            {teamTypes.map((type) => (
                <React.Fragment key={type}>
                    <Title text={type} />
                    <div className={cx('teamGrid')}>
                        {teams
                            .filter((team) => team.type === type)
                            .map((team) => (
                                <TeamItem
                                    key={team.id}
                                    imageUrl={team.image}
                                    gender={team.gender}
                                    name={team.name}
                                    position={team.position}
                                />
                            ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default TeamPage;
