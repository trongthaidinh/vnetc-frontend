import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getNews } from '~/services/newsService';
import { getCategoryById } from '~/services/categoryService';
import styles from './News.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [categoryNames, setCategoryNames] = useState({});
    const [categorySlugs, setCategorySlugs] = useState({});
    const [groupedNews, setGroupedNews] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState('Nổi bật');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                const newsItemsWithTimestampCreatedAt = data.map((item) => ({
                    ...item,
                    image: item.images,
                    createdAt: new Date(item.createdAt).getTime(),
                }));
                setNewsItems(newsItemsWithTimestampCreatedAt);

                const categoryNamesMap = {};
                const categorySlugsMap = {};
                const groupedNewsMap = {};

                await Promise.all(
                    data.map(async (item) => {
                        if (!categoryNamesMap[item.categoryId]) {
                            const category = await getCategoryById(item.categoryId);
                            categoryNamesMap[item.categoryId] = category.name;
                            categorySlugsMap[item.categoryId] = category.slug;
                        }

                        if (!groupedNewsMap[item.categoryId]) {
                            groupedNewsMap[item.categoryId] = [];
                        }
                        groupedNewsMap[item.categoryId].push(item);
                    }),
                );

                setCategoryNames(categoryNamesMap);
                setCategorySlugs(categorySlugsMap);
                setGroupedNews(groupedNewsMap);
            } catch (error) {
                setError(error);
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
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
                    {Object.keys(groupedNews).map((categoryId) => (
                        <div key={categoryId} className={cx('news-category')}>
                            <Title
                                text={categoryNames[categoryId] || 'Loading...'}
                                showSeeAll={true}
                                slug={`${routes.news}/${categorySlugs[categoryId]}`}
                            />
                            <div className={cx('news-items')}>
                                {groupedNews[categoryId].slice(0, 6).map((item, index) => (
                                    <Link key={index} to={`${routes.news}/${categorySlugs[categoryId]}/${item._id}`}>
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
                    ))}
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
