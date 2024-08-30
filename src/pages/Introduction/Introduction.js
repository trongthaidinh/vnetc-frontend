import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from '~/components/Title';
import styles from './Introduction.module.scss';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { getPageBySlug } from '~/services/pageService';

const cx = classNames.bind(styles);

const Introduction = () => {
    const { slug } = useParams();
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    <div className={cx('attachments')}>
                        <embed src={pdfUrl} width="100%" height="1200px" type="application/pdf" />
                    </div>
                )}
                <div className={cx('content')} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </div>
        </article>
    );
};

export default Introduction;
