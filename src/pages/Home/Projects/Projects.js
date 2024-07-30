import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getProjects } from '~/services/projectService';
import { getCategoriesByType } from '~/services/categoryService';
import CardContent from '~/components/CardContent';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './Projects.module.scss';

const cx = classNames.bind(styles);

function Projects() {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const [projectsData, categoriesData] = await Promise.all([getProjects(), getCategoriesByType(4)]);
                setProjects(projectsData);
                setCategories(categoriesData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const getCategorySlug = (project) => {
        const category = categories.find((cat, index) => index === project.projectType);
        return category ? category.slug : '';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Dự án và năng lực" showSeeAll={true} slug={`${routes.projects}`} />
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                        1280: { slidesPerView: 4 },
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        0: { slidesPerView: 1 },
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className={cx('slide')}>
                            <Link to={`${routes.projects}/${getCategorySlug(project)}/${project._id}`}>
                                <CardContent
                                    title={project.name}
                                    summary={project.summary}
                                    image={project.image}
                                    createdAt={project.createdAt}
                                    views={project.views}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Projects;
