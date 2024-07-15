import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ServiceDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getServiceById } from '~/services/serviceService';

const cx = classNames.bind(styles);

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceDetail, setServiceDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const data = await getServiceById(id);
                console.log(data);
                setServiceDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching service detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
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
                <Title text={`${serviceDetail.name}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: serviceDetail.content }} />
            <DateTime
                timestamp={serviceDetail.createdAt}
                views={serviceDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default ServiceDetail;
