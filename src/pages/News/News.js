import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getNews } from '~/services/newsService';
import styles from './News.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNewsItems(data);
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
                    <div className={cx('news-specialized')}>
                        <Title text="Tin ngành" />
                        <div className={cx('news-items')}>
                            {newsItems.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    link={item.link}
                                    createdAt={item.createdAt}
                                    readers={item.readers}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('news-socio-economic')}>
                        <Title text="Tin kinh tế - xã hội" />
                        <div className={cx('news-items')}>
                            {newsItems.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    link={item.link}
                                    createdAt={item.createdAt}
                                    readers={item.readers}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <div className={cx('suggest-items')}>
                        <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} />
                        {newsItems.map((item, index) => (
                            <SuggestCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                                link={item.link}
                                createdAt={item.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default News;
