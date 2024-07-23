import React, { useEffect, useState } from 'react';
import TeamItem from './TeamItem';
import Title from '~/components/Title';
import { getDepartments, getDepartmentMembers } from '~/services/teamService';
import classNames from 'classnames/bind';
import styles from './Teams.module.scss';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

const TeamPage = () => {
    const [departments, setDepartments] = useState([]);
    const [members, setMembers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                setDepartments(data);

                const membersData = {};
                await Promise.all(
                    data.map(async (department) => {
                        const departmentMembers = await getDepartmentMembers(department._id);
                        membersData[department._id] = departmentMembers;
                    }),
                );
                setMembers(membersData);
            } catch (error) {
                console.error('Error fetching departments or members:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('teamPage')}>
            {departments.map((department) => (
                <React.Fragment key={department._id}>
                    <Title text={department.name} />
                    <div className={cx('teamGrid')}>
                        {members[department._id]
                            ?.sort((a, b) => a.position - b.position)
                            .map((member) => (
                                <TeamItem
                                    key={member._id}
                                    imageUrl={member.image}
                                    name={member.name}
                                    position={member.qualification}
                                />
                            ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default TeamPage;
