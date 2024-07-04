import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NewsDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

const NewsDetail = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                // const data = await getNewsById(id);
                // Điều chỉnh sau khi có API hoặc dữ liệu thực
                const data = {
                    id: 1,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                    image: 'https://www.vnetc.com.vn/assets/img/post/z4982216183705_fa134df795ac46d96e14c6bdf6d8ec2b.jpg',
                    views: 55,
                    createdAt: 1642498745000,
                    updatedAt: 1642528745000,
                    content: `
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            <br />
                            <img src="https://www.vnetc.com.vn/assets/img/post/z4982216183705_fa134df795ac46d96e14c6bdf6d8ec2b.jpg" alt="Image 1" style="max-width: 100%;" />
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />
                            <img src="https://www.vnetc.com.vn/assets/img/post/z4982216183705_fa134df795ac46d96e14c6bdf6d8ec2b.jpg" alt="Image 2" style="max-width: 100%;" />
                            <br />
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />
                            <br />
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    `,
                };
                setNewsDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching news detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <article className={cx('wrapper')}>
            <div className={cx('header')}>
                <Title text={`${newsDetail.title}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
            <DateTime
                timestamp={newsDetail.createdAt}
                views={newsDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default NewsDetail;
