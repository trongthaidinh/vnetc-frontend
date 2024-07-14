import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getNewsByCategory } from '~/services/newsService';
import styles from './News.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';

const cx = classNames.bind(styles);

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupedNews, setGroupedNews] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState('Nổi bật');

    useEffect(() => {
        const fetchCategoriesAndNews = async () => {
            try {
                const categoriesData = await getCategoriesByType(2);
                setCategories(categoriesData);

                const groupedNewsMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const newsData = await getNewsByCategory(category._id);
                        groupedNewsMap[category._id] = newsData.map((item) => ({
                            ...item,
                            image: item.images,
                            createdAt: new Date(item.createdAt).getTime(),
                        }));
                    }),
                );

                setGroupedNews(groupedNewsMap);
                setNewsItems(Object.values(groupedNewsMap).flat());
            } catch (error) {
                setError(error);
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndNews();
    }, []);

    const handleButtonClick = (type) => {
        setSelectedSuggestion(type);
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredNewsItems = newsItems
        .filter((item) => {
            if (selectedSuggestion === 'Nổi bật') {
                return item.isFeatured;
            }
            if (selectedSuggestion === 'Xem nhiều') {
                return item.views > 10;
            }
            return true;
        })
        .slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <div className={cx('news-section')}>
                <div className={cx('news-column')}>
                    <h2 className={cx('news-title')}>Tin Tức</h2>
                    {categories.map((category) => {
                        return (
                            <div key={category._id} className={cx('news-category')}>
                                <Title
                                    text={category.name || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.news}/${category.slug}`}
                                    categoryId={category._id}
                                />
                                <div className={cx('news-items')}>
                                    {groupedNews[category._id]?.slice(0, 6).map((item, index) => (
                                        <Link key={index} to={`${routes.news}/${category.slug}/${item._id}`}>
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
                            </div>
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredNewsItems.map((item, index) => (
                            <Link key={index} to={`/news/${item._id}`}>
                                <SuggestCard
                                    title={item.title}
                                    summary={item.summary}
                                    image={item.images}
                                    createdAt={item.createdAt}
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

export default News;
