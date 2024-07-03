import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CardContent from '~/components/CardContent';
import { getNews } from '~/services/newsService';
import Title from '~/components/Title';
import styles from './SocialEconomicNews.module.scss';

const cx = classNames.bind(styles);

function SocialEconomicNews() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    useEffect(() => {
        async function fetchSocialEconomicNews() {
            try {
                const data = await getNews();
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        fetchSocialEconomicNews();
    }, []);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentSocialEconomicNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(news.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderSocialEconomicNews = () => {
        return currentSocialEconomicNews.map((news) => (
            <CardContent
                key={news.id}
                image={news.image}
                title={news.title}
                description={news.description}
                createdAt={news.createdAt}
                readers={news.readers}
                link={`/news/${news.slug}`}
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

    const category = news[0]?.category || 'Danh mục';

    return (
        <div className={cx('container')}>
            <Title text={`${category}`} />
            <div className={cx('newsGrid')}>{renderSocialEconomicNews()}</div>
            {renderPagination()}
        </div>
    );
}

export default SocialEconomicNews;
