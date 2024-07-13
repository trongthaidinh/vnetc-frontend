import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getNewsByCategory } from '~/services/newsService';
import Title from '~/components/Title';
import styles from './IndustryNews.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';
import { getCategoriesByType } from '~/services/categoryService';

const cx = classNames.bind(styles);

function NewsCategory() {
    const location = useLocation();
    const [news, setNews] = useState([]);
    const [categoryId, setCategoryId] = useState(location.state?.categoryId || null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(2);
                const category = categories.find((cat) => cat._id === categoryId);
                if (category) {
                    setCategoryId(category._id);
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (!categoryId) {
            fetchCategory();
        }
    }, [categoryId]);

    useEffect(() => {
        async function fetchNewsCategory() {
            if (categoryId) {
                try {
                    const data = await getNewsByCategory(categoryId);
                    console.log(data);
                    setNews(data);
                } catch (error) {
                    console.error('Error fetching news:', error);
                }
            }
        }

        fetchNewsCategory();
    }, [categoryId]);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNewsCategory = news.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderNewsCategory = () => {
        return currentNewsCategory.map((newsItem, index) => (
            <Link to={`/news/${newsItem._id}`} key={index}>
                <Card
                    title={newsItem.title}
                    image={newsItem.image}
                    summary={newsItem.summary}
                    createdAt={newsItem.createdAt}
                    views={newsItem.views}
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
            <div className={cx('newsGrid')}>{renderNewsCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default NewsCategory;
