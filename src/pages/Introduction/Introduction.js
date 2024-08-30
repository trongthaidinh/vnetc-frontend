import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './Introduction.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { getPageBySlug } from '~/services/pageService';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const cx = classNames.bind(styles);

const Introduction = () => {
    const { slug } = useParams();
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                if (slug) {
                    const data = await getPageBySlug(slug);
                    setPageContent(data);
                } else {
                    setError(new Error('No slug provided'));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching page content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [slug]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    if (!pageContent) {
        return <PushNotification message="No content available" />;
    }

    const pdfUrl = pageContent.attachments
        ? `${process.env.REACT_APP_HOST}/${pageContent.attachments.replace(/\\/g, '/')}`
        : null;

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{pageContent.name} | VNETC</title>
                <meta
                    name="description"
                    content={pageContent.description || 'Thông tin về trang giới thiệu của VNETC.'}
                />
                <meta name="keywords" content="giới thiệu, VNETC, thông tin công ty" />
                <meta name="author" content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM - VNETC" />
            </Helmet>
            <div className={cx('inner')}>
                <Title text={pageContent.name} />
                {pdfUrl && (
                    <div className={cx('pdf-viewer')}>
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer
                                fileUrl={pdfUrl}
                                plugins={[defaultLayoutPluginInstance]}
                                initialPage={0}
                                // defaultScale={1.4}
                            />
                        </Worker>
                    </div>
                )}
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default Introduction;
