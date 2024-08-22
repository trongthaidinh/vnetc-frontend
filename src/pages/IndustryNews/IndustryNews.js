import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getNewsByCategory } from '~/services/newsService';
import Title from '~/components/Title';
import styles from './IndustryNews.module.scss';
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

function NewsCategory() {
    const location = useLocation();
    const [news, setNews] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDates, setFilterDates] = useState([]);
    const newsPerPage = 12;

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
        async function fetchNewsCategory() {
            if (categoryId) {
                try {
                    const data = await getNewsByCategory(categoryId);
                    const filteredNews =
                        filterDates.length === 2
                            ? data.filter(
                                  (newsItem) =>
                                      dayjs(newsItem.createdAt).isAfter(filterDates[0]) &&
                                      dayjs(newsItem.createdAt).isBefore(filterDates[1].endOf('day')),
                              )
                            : data;

                    setNews(
                        filteredNews.map((newsItem) => ({
                            ...newsItem,
                            isNew: dayjs().diff(dayjs(newsItem.createdAt), 'day') <= 3,
                        })),
                    );
                } catch (error) {
                    console.error('Error fetching news:', error);
                }
            }
        }

        fetchNewsCategory();
    }, [categoryId, filterDates]);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNewsCategory = news.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRangeChange = (dates) => {
        setFilterDates(dates);
    };

    const renderNewsCategory = () => {
        if (currentNewsCategory.length === 0) {
            return (
                <>
                    <div />
                    <Empty description="Không có tin tức để hiển thị" />
                    <div />
                </>
            );
        }

        return currentNewsCategory.map((newsItem) => (
            <Link to={`${routes.news}/${slug}/${newsItem._id}`} key={newsItem._id}>
                <Card
                    title={newsItem.title}
                    image={newsItem.images}
                    summary={newsItem.summary}
                    createdAt={newsItem.createdAt}
                    views={newsItem.views}
                    isNew={newsItem.isNew}
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
            <Helmet>
                <title>{categoryName} | VNETC</title>
                <meta name="description" content={`Xem các tin tức liên quan đến ${categoryName} trên VNETC.`} />
                <meta name="keywords" content={`${categoryName}, tin tức, VNETC`} />
            </Helmet>
            <Title text={categoryName} />

            <div className={cx('filter')}>
                <Space direction="vertical" size={12}>
                    <RangePicker onChange={handleRangeChange} locale="vi" />
                </Space>
                <Button
                    className={cx('filter-button')}
                    type="primary"
                    icon={<FilterOutlined />}
                    onClick={() => setCurrentPage(1)}
                >
                    Áp dụng
                </Button>
            </div>

            <div className={cx('newsGrid')}>{renderNewsCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default NewsCategory;
