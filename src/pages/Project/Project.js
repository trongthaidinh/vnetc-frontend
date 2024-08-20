import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getProjects } from '~/services/projectService';
import { getCategoriesByType } from '~/services/categoryService';
import styles from './Project.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

function Project() {
    const [projectItems, setProjectItems] = useState([]);
    const [groupedProject, setGroupedProject] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndProjects = async () => {
            try {
                const categoriesData = await getCategoriesByType(4);
                setCategories(categoriesData);

                const projectData = await getProjects();
                const groupedProjectMap = {};

                projectData?.forEach((item) => {
                    const projectType = item.projectType;
                    if (!groupedProjectMap[projectType]) {
                        groupedProjectMap[projectType] = [];
                    }
                    groupedProjectMap[projectType].push({
                        ...item,
                        image: item.image,
                    });
                });

                setGroupedProject(groupedProjectMap);
                setProjectItems(projectData);
            } catch (error) {
                setError(error);
                console.error('Error fetching categories or projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProjects();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getCategorySlug = (projectType) => {
        const category = categories.find((cat, index) => index === projectType);
        return category ? category.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    let filteredProjectItems = projectItems;
    if (selectedSuggestion === 0) {
        filteredProjectItems = shuffleArray([...projectItems]);
    } else if (selectedSuggestion === 1) {
        filteredProjectItems = projectItems.filter((item) => item.views > 10);
    }
    filteredProjectItems = filteredProjectItems.slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Dự án và Năng lực | VNETC</title>
                <meta name="description" content="Khám phá các dự án của chúng tôi." />
            </Helmet>
            <div className={cx('project-section')}>
                <div className={cx('project-column')}>
                    <h2 className={cx('project-title')}>Dự án</h2>
                    {Object.keys(groupedProject).map((projectType) => {
                        const category = categories[projectType];
                        if (!category) return null;

                        const projectsInCategory = groupedProject[projectType];
                        const shouldLoop = projectsInCategory.length > 3;

                        return (
                            <div key={projectType} className={cx('project-category')}>
                                <Title
                                    text={category.name}
                                    showSeeAll={true}
                                    slug={`${routes.projects}/${category.slug}`}
                                    categoryId={category._id}
                                />
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    breakpoints={{
                                        1280: { slidesPerView: 3 },
                                        1024: { slidesPerView: 3 },
                                        768: { slidesPerView: 2 },
                                        0: { slidesPerView: 1 },
                                    }}
                                    loop={shouldLoop}
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {projectsInCategory?.slice(0, 6).map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.projects}/${category.slug}/${item._id}`}>
                                                <Card
                                                    title={item.name}
                                                    summary={item.summary}
                                                    image={item.image}
                                                    createdAt={item.createdAt}
                                                    views={item.views}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Ngẫu nhiên', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredProjectItems.map((item, index) => (
                            <Link
                                key={index}
                                to={`${routes.projects}/${getCategorySlug(item.projectType)}/${item._id}`}
                            >
                                <SuggestCard
                                    title={item.name}
                                    summary={item.summary}
                                    image={item.image}
                                    createdAt={item.createdAt}
                                    views={item.views}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Project;
