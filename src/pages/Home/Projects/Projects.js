import React, { useState, useEffect } from 'react';
import styles from './Projects.module.scss';
import classNames from 'classnames/bind';
import { getProjects } from '~/services/projectService';
import CardContent from '~/components/CardContent';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading projects: {error.message}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dự án nổi bật" />
                <div className={cx('project-list')}>
                    {projects.map((project, index) => (
                        <CardContent
                            key={index}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            link={project.link}
                            createdAt={project.createdAt}
                            readers={project.readers}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;
