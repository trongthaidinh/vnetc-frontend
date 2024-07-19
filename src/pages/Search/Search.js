import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { searchItems } from '~/services/searchService';
import styles from './Search.module.scss';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getNews } from '~/services/newsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '~/services/categoryService';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('q');
    const resultsPerPage = 9;

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const searchData = await searchItems(query, resultsPerPage, currentPage);
                const [newsData, categoryData] = await Promise.all([getNews(), getCategories()]);
                setSearchResults(searchData.results);
                setNews(newsData);
                setCurrentPage(searchData.currentPage);
                setCategories(categoryData);
                setTotalPages(searchData.totalPages);
            } catch (error) {
                setError(error);
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, currentPage]);

    const getCategorySlug = (news) => {
        const category = categories.find((cat) => cat._id === news.categoryId);
        return category ? category.slug : '';
    };

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            console.log(pageNumber);
            setCurrentPage(pageNumber);
        }
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredNews = news
        .filter((item) => {
            if (selectedSuggestion === 0) {
                return item.isFeatured;
            }
            if (selectedSuggestion === 1) {
                return item.views > 10;
            }
            return true;
        })
        .slice(0, 5);

    const renderSearchResults = () => {
        return searchResults.map((item, index) => (
            <Link key={index} to={`${routes.news}/${getCategorySlug(item)}/${item._id}`}>
                <Card
                    title={item.title}
                    summary={item.summary}
                    image={item.images}
                    createdAt={new Date(item.createdAt).getTime()}
                    views={item.views}
                />
            </Link>
        ));
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <div
                    key={i}
                    className={cx('pageButton', { active: currentPage === i })}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </div>,
            );
        }
        return (
            <div className={cx('pagination')}>
                <div
                    className={cx('pageButton', { disabled: currentPage === 1 })}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {pages}
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
        <article className={cx('wrapper')}>
            <div className={cx('search-section')}>
                <div className={cx('search-column')}>
                    <h2 className={cx('search-title')}>Kết Quả Tìm Kiếm</h2>
                    <div className={cx('search-items')}>{renderSearchResults()}</div>
                    {renderPagination()}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredNews &&
                            filteredNews.map((item, index) => (
                                <Link key={index} to={`/news/${item._id}`}>
                                    <SuggestCard
                                        title={item.title}
                                        summary={item.summary}
                                        image={item.images}
                                        createdAt={new Date(item.createdAt).getTime()}
                                        views={item.views}
                                    />
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Search;
