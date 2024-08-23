import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getSearchNews, getSearchProject, getSearchService } from '~/services/searchService';
import styles from './Search.module.scss';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getCategories, getCategoriesByType } from '~/services/categoryService';
import Title from '~/components/Title';
import { getNewsPagination } from '~/services/newsService';
import { Empty } from 'antd';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchResults, setSearchResults] = useState({
        news: [],
        projects: [],
        services: [],
    });

    const [suggests, setSuggests] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriesProject, setCategoriesProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const [currentPages, setCurrentPages] = useState({
        news: 1,
        projects: 1,
        services: 1,
    });
    const [totalPages, setTotalPages] = useState({
        news: 1,
        projects: 1,
        services: 1,
    });
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('q');
    const resultsPerPage = 6;

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);

                const [suggestData, newsData, projectData, serviceData, categoryData, categoryProject] =
                    await Promise.all([
                        getNewsPagination(1, 20),
                        getSearchNews(query, resultsPerPage, currentPages.news),
                        getSearchProject(query, resultsPerPage, currentPages.projects),
                        getSearchService(query, resultsPerPage, currentPages.services),
                        getCategories(),
                        getCategoriesByType(3),
                        getCategoriesByType(4),
                    ]);

                setSearchResults({
                    news: newsData.results,
                    projects: projectData.results,
                    services: serviceData.results,
                });

                setSuggests(suggestData.news);
                setCategories(categoryData);
                setCategoriesProject(categoryProject);
                setTotalPages({
                    news: newsData.totalPages,
                    projects: projectData.totalPages,
                    services: serviceData.totalPages,
                });
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
    }, [query, currentPages]);

    const getCategorySlug = (item) => {
        const category = categories.find((cat) => cat._id === item.categoryId);
        return category ? category.slug : '';
    };

    const getProjectCategorySlug = (item) => {
        const category = categoriesProject.find((cat, index) => index === item.projectType);
        return category ? category.slug : '';
    };

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const handlePageChange = (section, pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages[section]) {
            setCurrentPages((prevPages) => ({
                ...prevPages,
                [section]: pageNumber,
            }));
        }
    };

    const renderPagination = (section) => {
        const pages = [];
        for (let i = 1; i <= totalPages[section]; i++) {
            pages.push(
                <div
                    key={i}
                    className={cx('pageButton', { active: currentPages[section] === i })}
                    onClick={() => handlePageChange(section, i)}
                >
                    {i}
                </div>,
            );
        }
        return (
            <div className={cx('pagination')}>
                <div
                    className={cx('pageButton', { disabled: currentPages[section] === 1 })}
                    onClick={() => handlePageChange(section, currentPages[section] - 1)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {pages}
                <div
                    className={cx('pageButton', { disabled: currentPages[section] === totalPages[section] })}
                    onClick={() => handlePageChange(section, currentPages[section] + 1)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredNews = suggests
        .filter((item) => {
            if (selectedSuggestion === 1) {
                return item.views > 10;
            }
            return true;
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    const renderSearchResults = () => {
        const hasResults =
            searchResults.news.length > 0 || searchResults.projects.length > 0 || searchResults.services.length > 0;

        if (!hasResults) {
            return (
                <Empty
                    description={
                        <>
                            Không có kết quả nào để hiển thị với từ khóa <strong>"{query}"</strong>
                        </>
                    }
                ></Empty>
            );
        }

        return (
            <>
                {searchResults.news && searchResults.news.length > 0 && (
                    <>
                        <Title text="Tin tức" />
                        <div className={cx('news-result')}>
                            {searchResults.news.map((item, index) => (
                                <Link key={index} to={`${routes.news}/${getCategorySlug(item)}/${item._id}`}>
                                    <Card
                                        title={item.title}
                                        summary={item.summary}
                                        image={item.images}
                                        createdAt={item.createdAt}
                                        views={item.views}
                                    />
                                </Link>
                            ))}
                        </div>
                        {renderPagination('news')}
                    </>
                )}

                {searchResults.projects && searchResults.projects.length > 0 && (
                    <>
                        <Title text="Dự án" />
                        <div className={cx('project-result')}>
                            {searchResults.projects.map((item, index) => (
                                <Link key={index} to={`${routes.projects}/${getProjectCategorySlug(item)}/${item._id}`}>
                                    <Card
                                        title={item.name}
                                        summary={item.summary}
                                        image={item.image}
                                        createdAt={item.createdAt}
                                        views={item.views}
                                    />
                                </Link>
                            ))}
                        </div>
                        {renderPagination('projects')}
                    </>
                )}

                {searchResults.services && searchResults.services.length > 0 && (
                    <>
                        <Title text="Dịch vụ - Sản Phẩm" />
                        <div className={cx('service-result')}>
                            {searchResults.services.map((item, index) => (
                                <Link key={index} to={`${routes.services}/${getCategorySlug(item)}/${item._id}`}>
                                    <Card
                                        title={item.name}
                                        summary={item.summary}
                                        image={item.image}
                                        createdAt={item.createdAt}
                                        views={item.views}
                                    />
                                </Link>
                            ))}
                        </div>
                        {renderPagination('services')}
                    </>
                )}
            </>
        );
    };

    return (
        <article className={cx('wrapper')}>
            <div className={cx('search-section')}>
                <div className={cx('search-column')}>
                    <h2 className={cx('search-title')}>Kết Quả Tìm Kiếm</h2>
                    <div className={cx('search-items')}>{renderSearchResults()}</div>
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Xem nhiều', 'Ngẫu nhiên']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-list')}>
                        {filteredNews.map((item, index) => (
                            <Link key={index} to={`${routes.news}/${getCategorySlug(item)}/${item._id}`}>
                                <SuggestCard
                                    key={index}
                                    title={item.title}
                                    summary={item.summary}
                                    image={item.images}
                                    createdAt={item.createdAt}
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
