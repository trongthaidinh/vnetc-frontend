// News.jsx
import React, { useState, useEffect } from 'react';
import styles from './News.module.scss';
import classNames from 'classnames/bind';
import { getNewsPagination } from '~/services/newsService';
import { getCategories } from '~/services/categoryService';
import CardContent from '~/components/CardContent';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import io from 'socket.io-client';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function News() {
    const [newsArr, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [newsData, categoryData] = await Promise.all([getNewsPagination(1, 12), getCategories()]);
                setNews(newsData.news);
                setCategories(categoryData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const socket = io(`${process.env.REACT_APP_HOST}`, {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('newsAdded', async () => {
            try {
                const updatedNewsData = await getNewsPagination(1, 12);
                setNews(updatedNewsData);
            } catch (error) {
                console.error('Error fetching updated news:', error);
            }
        });

        return () => {
            socket.off('newsAdded');
            socket.disconnect();
        };
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredNews = (() => {
        switch (activeIndex) {
            case 0:
                return [...newsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
            case 1:
                return newsArr.filter((news) => news.isFeatured).slice(0, 4);
            case 2:
                return [...newsArr].sort(() => Math.random() - 0.5).slice(0, 4);
            default:
                return newsArr;
        }
    })();

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const getCategorySlug = (news) => {
        const category = categories.find((cat) => cat._id === news.categoryId);
        return category ? category.slug : '';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title-container')}>
                    <Title text="Tin tức" showSeeAll={true} slug={`${routes.news}`} />
                </div>
                <ButtonGroup
                    buttons={['Mới nhất', 'Nổi bật', 'Ngẫu nhiên']}
                    onButtonClick={handleButtonClick}
                    activeIndex={activeIndex}
                />
                <div className={cx('news-list')}>
                    {filteredNews.map((news, index) => {
                        const isNew = dayjs().diff(dayjs(news.createdAt), 'day') <= 3;

                        return (
                            <Link key={index} to={`${routes.news}/${getCategorySlug(news)}/${news._id}`}>
                                <CardContent
                                    title={news.title}
                                    summary={news.summary}
                                    image={news.images}
                                    link={news.link}
                                    createdAt={news.createdAt}
                                    views={news.views}
                                    isNew={isNew}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default News;
