import React, { useState, useEffect } from 'react';
import styles from './News.module.scss';
import classNames from 'classnames/bind';
import { getNews } from '~/services/newsService';
import CardContent from '~/components/CardContent';
import ButtonGroup from '~/components/ButtonGroup';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

function News() {
    const [newsArr, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const buttons = ['Nổi bật', 'Mới nhất', 'Ngẫu nhiên'];

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await getNews();
                setNews(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading News: {error.message}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Tin tức" />
                <ButtonGroup buttons={buttons} />
                <div className={cx('news-list')}>
                    {newsArr.map((news, index) => (
                        <CardContent
                            key={index}
                            title={news.title}
                            description={news.description}
                            image={news.image}
                            link={news.link}
                            createdAt={news.createdAt}
                            readers={news.readers}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
