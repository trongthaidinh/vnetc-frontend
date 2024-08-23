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
import dayjs from 'dayjs';
import { DatePicker, Space, Button, Empty } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import 'moment/locale/vi';

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);

function ActivityCategory() {
    const location = useLocation();
    const [activity, setActivity] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDates, setFilterDates] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const activityPerPage = 6;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(2);
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
                    const startDate = filterDates[0] ? dayjs(filterDates[0]).format('YYYY-MM-DD') : '';
                    const endDate = filterDates[1] ? dayjs(filterDates[1]).format('YYYY-MM-DD') : '';

                    const data = await getActivityByCategory(
                        categoryId,
                        startDate,
                        endDate,
                        currentPage,
                        activityPerPage,
                    );

                    setActivity(
                        data.activity.map((activityItem) => ({
                            ...activityItem,
                            isNew: dayjs().diff(dayjs(activityItem.createdAt), 'day') <= 3,
                        })),
                    );
                    setTotalPages(data.totalPages);
                } catch (error) {
                    console.error('Error fetching activity:', error);
                }
            }
        }

        fetchActivityCategory();
    }, [categoryId, filterDates, currentPage]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRangeChange = (dates) => {
        setFilterDates(dates);
        setCurrentPage(1);
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

            <div className={cx('filter')}>
                <Space direction="vertical" size={12}>
                    <RangePicker
                        onChange={handleRangeChange}
                        locale="vi"
                        popupStyle={{
                            width: windowWidth < 992 ? '100%' : 'auto',
                            maxWidth: windowWidth < 992 ? '300px' : 'none',
                            minWidth: '250px',
                            overflow: 'hidden',
                        }}
                    />
                </Space>
                <Button
                    className={cx('filter-button')}
                    type="primary"
                    icon={<FilterOutlined />}
                    onClick={() => setCurrentPage(1)}
                >
                    Lọc
                </Button>
            </div>

            <div className={cx('activityGrid')}>{renderActivityCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default ActivityCategory;
