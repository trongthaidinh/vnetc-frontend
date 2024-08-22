import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LegalDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import Title from '~/components/Title';
import { getLegalById } from '~/services/legalService';
import { Helmet } from 'react-helmet';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const cx = classNames.bind(styles);

const LegalDetail = () => {
    const { id } = useParams();
    const [legalDetail, setLegalDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

    const pdfUrl = legalDetail.attachments
        ? `${process.env.REACT_APP_HOST}/${legalDetail.attachments
              .find((attachment) => attachment.file_type === 'pdf')
              ?.file_url.replace(/\\/g, '/')}`
        : null;

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{`${legalDetail.title} | VNETC`}</title>
                <meta name="description" content={legalDetail.content} />
                <meta name="keywords" content={`thông tư, ${legalDetail.title}, VNETC`} />
            </Helmet>
            <div className={cx('header')}>
                <Title text={legalDetail.title} className={cx('title')} />
            </div>
            <div className={cx('content')}>
                {pdfUrl ? (
                    <div className={cx('pdf-viewer')}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                        </Worker>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: legalDetail.content }} />
                )}
            </div>
        </article>
    );
};

export default LegalDetail;
