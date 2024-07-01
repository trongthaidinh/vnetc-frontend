import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CardContent from '~/components/CardContent';
import { getProjects } from '~/services/projectService';
import Title from '~/components/Title';
import styles from './Projects.module.scss';

const cx = classNames.bind(styles);

function Projects() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 12;

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderProjects = () => {
        return currentProjects.map((project) => (
            <CardContent
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                createdAt={project.createdAt}
                readers={project.readers}
                link={`/project/${project.slug}`}
            />
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={cx('pageButton', { active: currentPage === index + 1 })}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    const category = projects[0]?.category || 'Danh mục';

    return (
        <div className={cx('container')}>
            <Title text={`${category}`} />
            <div className={cx('projectGrid')}>{renderProjects()}</div>
            {renderPagination()}
        </div>
    );
}

export default Projects;
