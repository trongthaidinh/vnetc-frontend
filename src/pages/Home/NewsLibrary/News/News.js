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
                const [newsData, categoryData] = await Promise.all([getNewsPagination(), getCategories()]);
                setNews(newsData);
                setCategories(categoryData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
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
                return newsArr.filter((news) => news.isFeatured);
            case 1:
                return [...newsArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 2:
                return newsArr.sort(() => Math.random() - 0.5);
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
                <Title text="Tin tức" showSeeAll={true} slug={`${routes.news}`} />
                <ButtonGroup
                    buttons={['Nổi bật', 'Mới nhất', 'Ngẫu nhiên']}
                    onButtonClick={handleButtonClick}
                    activeIndex={activeIndex}
                />
                <div className={cx('news-list')}>
                    {filteredNews.map((news, index) => (
                        <Link key={index} to={`${routes.news}/${getCategorySlug(news)}/${news._id}`}>
                            <CardContent
                                title={news.title}
                                summary={news.summary}
                                image={news.images}
                                link={news.link}
                                createdAt={news.createdAt}
                                views={news.views}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
