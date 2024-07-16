import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProjectDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getProjectById } from '~/services/projectService';

const cx = classNames.bind(styles);

const ProjectDetail = () => {
    const { id } = useParams();
    const [projectDetail, setProjectDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                const data = await getProjectById(id);
                console.log(data);
                setProjectDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching project detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetail();
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
                <Title text={`${projectDetail.name}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: projectDetail.content }} />
            <DateTime
                timestamp={new Date(projectDetail.createdAt).getTime()}
                views={projectDetail.views}
                showDate={true}
                showTime={true}
                showViews={true}
            />
        </article>
    );
};

export default ProjectDetail;
