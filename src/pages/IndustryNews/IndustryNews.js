import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getNews } from '~/services/newsService';
import Title from '~/components/Title';
import styles from './IndustryNews.module.scss';
import { Link } from 'react-router-dom';
import Card from '~/components/CardContent/CardContent';

const cx = classNames.bind(styles);

function IndustryNews() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    useEffect(() => {
        async function fetchIndustryNews() {
            try {
                const data = await getNews();
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        fetchIndustryNews();
    }, []);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentIndustryNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderIndustryNews = () => {
        return currentIndustryNews.map((news, index) => (
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

    const category = news[0]?.category || 'Danh mục';

    return (
        <div className={cx('container')}>
            <Title text={`${category}`} />
            <div className={cx('newsGrid')}>{renderIndustryNews()}</div>
            {renderPagination()}
        </div>
    );
}

export default IndustryNews;
