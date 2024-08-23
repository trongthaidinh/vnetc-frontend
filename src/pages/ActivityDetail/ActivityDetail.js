import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ActivityDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getActivityById } from '~/services/activityService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const ActivityDetail = () => {
    const { id } = useParams();
    const [activityDetail, setActivityDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const data = await getActivityById(id);
                setActivityDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching activity detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivityDetail();
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
            <Helmet>
                <title>{activityDetail.title} | VNETC</title>
                <meta name="description" content={activityDetail.summary} />
                <meta name="keywords" content="hoạt động, VNETC, chi tiết hoạt động" />
            </Helmet>
            <div className={cx('header')}>
                <Title text={`${activityDetail.title}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: activityDetail.content }} />
            <DateTime
                timestamp={activityDetail.createdAt}
                views={activityDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default ActivityDetail;
