import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getNewsByCategory } from '~/services/newsService';
import { getCategoryName } from '~/services/categoryService';
import Title from '~/components/Title';
import styles from './IndustryNews.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';

const cx = classNames.bind(styles);

function NewsCategory() {
    const { categoryId } = useParams();
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    const getCategoryName = (categoryId) => {
        switch (categoryId) {
            case 1:
                return { name: 'Tin ngành', slug: 'industry-news' };
            case 2:
                return { name: 'Tin kinh tế - xã hội', slug: 'socio-economic-news' };
            default:
                return { name: 'Tin tức', slug: 'general-news' };
        }
    };

    useEffect(() => {
        async function fetchNewsCategory() {
            try {
                const data = await getNewsByCategory(categoryId);
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
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
        return currentNewsCategory.map((news, index) => (
            <Link to={`/news/${news.id}`} key={index}>
                <Card
                    title={news.title}
                    image={news.image}
                    summary={news.summary}
                    createdAt={news.createdAt}
                    views={news.views}
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

    const { name: categoryName } = getCategoryName(parseInt(categoryId, 10));

    return (
        <div className={cx('container')}>
            <Title text={`${categoryName}`} />
            <div className={cx('newsGrid')}>{renderNewsCategory()}</div>
            {renderPagination()}
        </div>
    );
}

export default NewsCategory;
