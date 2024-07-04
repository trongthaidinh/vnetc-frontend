import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getNews } from '~/services/newsService';
// import { getCategoryName } from '~/services/categoryService';
import styles from './News.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [categoryNames, setCategoryNames] = useState({});
    const [categorySlugs, setCategorySlugs] = useState({});
    const [groupedNews, setGroupedNews] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCategoryName = (categoryId) => {
        switch (categoryId) {
            case 1:
                return { name: 'Tin ngành', slug: 'industry-news' };
            case 2:
                return { name: 'Tin kinh tế - xã hội', slug: 'social-economic-news' };
            default:
                return { name: 'Tin tức', slug: 'general-news' };
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNewsItems(data);

                const categoryNamesMap = {};
                const categorySlugsMap = {};
                const groupedNewsMap = {};

                await Promise.all(
                    data.map(async (item) => {
                        if (!categoryNamesMap[item.categoryId]) {
                            const category = await getCategoryName(item.categoryId);
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

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

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
                                slug={`/news/${categorySlugs[categoryId]}`}
                            />
                            <div className={cx('news-items')}>
                                {groupedNews[categoryId].map((item, index) => (
                                    <Link to={`/news/${item._id}`} key={index}>
                                        <Card {...item} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <div className={cx('suggest-items')}>
                        <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} />
                        {newsItems.map((item, index) => (
                            <Link to={`/news/${item._id}`} key={index}>
                                <SuggestCard {...item} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default News;
