import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getProjectByType } from '~/services/projectService';
import Title from '~/components/Title';
import styles from './ProjectCategory.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function ProjectCategory() {
    const location = useLocation();
    const [project, setProject] = useState([]);
    const [projectType, setProjectType] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const projectPerPage = 9;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(4);
                const categoryIndex = categories.findIndex((cat) => cat.slug === slug);
                const category = categories[categoryIndex];
                if (category) {
                    setProjectType(categoryIndex);
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]);

    useEffect(() => {
        async function fetchProjectCategory() {
            try {
                const data = await getProjectByType(projectType);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        }

        fetchProjectCategory();
    }, [projectType]);

    const indexOfLastProject = currentPage * projectPerPage;
    const indexOfFirstProject = indexOfLastProject - projectPerPage;
    const currentProjectCategory = project.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(project.length / projectPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderProjectCategory = () => {
        return currentProjectCategory.map((projectItem) => (
            <Link to={`${routes.projects}/${slug}/${projectItem._id}`} key={projectItem._id}>
                <Card
                    title={projectItem.name}
                    image={projectItem.image}
                    summary={projectItem.summary}
                    createdAt={new Date(projectItem.createdAt).getTime()}
                    views={projectItem.views}
                />
            </Link>
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

    return (
        <div className={cx('container')}>
            <Title text={categoryName} />
            <div className={cx('projectGrid')}>{renderProjectCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default ProjectCategory;
