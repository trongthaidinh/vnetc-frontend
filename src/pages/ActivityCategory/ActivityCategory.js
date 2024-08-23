import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getActivityByCategory } from '~/services/activityService';
import Title from '~/components/Title';
import styles from './ActivityCategory.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';
import routes from '~/config/routes';
import { Helmet } from 'react-helmet';
import { Empty } from 'antd';

const cx = classNames.bind(styles);

function ActivityCategory() {
    const location = useLocation();
    const [activity, setActivity] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const activityPerPage = 6;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(5);
                const category = categories.find((cat) => cat.slug === slug);
                if (category) {
                    setCategoryId(category._id);
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
        async function fetchActivityCategory() {
            if (categoryId) {
                try {
                    const data = await getActivityByCategory(categoryId, currentPage, activityPerPage);

                    setActivity(
                        data.actions.map((activityItem) => ({
                            ...activityItem,
                        })),
                    );
                    setTotalPages(data.totalPages);
                } catch (error) {
                    console.error('Error fetching activity:', error);
                }
            }
        }

        fetchActivityCategory();
    }, [categoryId, currentPage]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderActivityCategory = () => {
        if (activity.length === 0) {
            return (
                <>
                    <div />
                    <Empty description="Không có hoạt động để hiển thị" />
                    <div />
                </>
            );
        }

        return activity.map((activityItem) => (
            <Link to={`${routes.activity}/${slug}/${activityItem._id}`} key={activityItem._id}>
                <Card
                    title={activityItem.title}
                    image={activityItem.images}
                    summary={activityItem.summary}
                    createdAt={activityItem.createdAt}
                    views={activityItem.views}
                    isNew={activityItem.isNew}
                />
            </Link>
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div
                    className={cx('pageButton', { disabled: currentPage === 1 })}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
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
                <div
                    className={cx('pageButton', { disabled: currentPage === totalPages })}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Helmet>
                <title>{categoryName} | VNETC</title>
                <meta name="description" content={`Xem các hoạt động liên quan đến ${categoryName} trên VNETC.`} />
                <meta name="keywords" content={`${categoryName}, hoạt động, VNETC`} />
            </Helmet>
            <Title text={categoryName} />

            <div className={cx('activityGrid')}>{renderActivityCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default ActivityCategory;
