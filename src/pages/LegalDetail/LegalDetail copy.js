import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LegalDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getLegalById } from '~/services/legalService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const LegalDetail = () => {
    const { id } = useParams();
    const [legalDetail, setLegalDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLegalDetail = async () => {
            try {
                const data = await getLegalById(id);
                setLegalDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching legal detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLegalDetail();
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
                <title>{`${legalDetail.name} | VNETC`}</title>
                <meta name="description" content={legalDetail.summary} />
                <meta name="keywords" content={`thông tư, ${legalDetail.name}, VNETC`} />
            </Helmet>
            <div className={cx('header')}>
                <Title text={`${legalDetail.name}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: legalDetail.content }} />
            <DateTime
                timestamp={legalDetail.createdAt}
                views={legalDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default LegalDetail;
