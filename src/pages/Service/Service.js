import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Card from '~/components/CardContent';
import SuggestCard from '~/components/SuggestCard';
import { getServiceByCategory } from '~/services/serviceService';
import styles from './Service.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const Service = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupedService, setGroupedService] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndService = async () => {
            try {
                const categoriesData = await getCategoriesByType(3);
                setCategories(categoriesData);

                const groupedServiceMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const allSubcategoryServices = [];
                        if (category.subcategories && category.subcategories.length > 0) {
                            await Promise.all(
                                category.subcategories.map(async (subcategory) => {
                                    const serviceData = await getServiceByCategory(subcategory._id);
                                    if (serviceData.service) {
                                        allSubcategoryServices.push(
                                            ...serviceData.service.map((item) => ({
                                                ...item,
                                                image: item.image[0],
                                                subcategoryId: subcategory._id,
                                                subcategorySlug: subcategory.slug,
                                            })),
                                        );
                                    }
                                }),
                            );
                        }

                        if (allSubcategoryServices.length > 0) {
                            groupedServiceMap[category._id] = allSubcategoryServices;
                        }
                    }),
                );

                setGroupedService(groupedServiceMap);
                setServiceItems(Object.values(groupedServiceMap).flat());
            } catch (error) {
                setError(error);
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndService();
    }, []);

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };

    const getCategorySlug = (categoryId) => {
        const category = categories.find((category) =>
            category.subcategories.some((subcategory) => subcategory._id === categoryId),
        );
        const subcategory = category?.subcategories.find((subcat) => subcat._id === categoryId);
        return subcategory ? subcategory.slug : '';
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const filteredServiceItems = serviceItems
        .filter((item) => {
            if (selectedSuggestion === 0) {
                return item.views > 10;
            }
            if (selectedSuggestion === 1) {
                return item.isFeatured;
            }
            return true;
        })
        .slice(0, 5);

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>Dịch vụ - Sản phẩm | VNETC</title>
                <meta name="description" content="Cập nhật những dịch vụ mới nhất về ngành điện lực." />
                <meta
                    name="keywords"
                    content="dịch vụ thí nghiệm, kiểm thử, thử nghiệm, quản lý vận hành, cập nhật, VNETC, vietnametc"
                />
            </Helmet>
            <div className={cx('service-section')}>
                <div className={cx('service-column')}>
                    <h2 className={cx('service-title')}>Dịch vụ</h2>
                    {categories.map((category) => {
                        const slides = groupedService[category._id] || [];
                        const shouldLoop = slides.length > 3;

                        if (slides.length === 0) return null;

                        return (
                            <div key={category._id} className={cx('service-category')}>
                                <Title
                                    text={category.name || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.services}/${category.slug}`}
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
                                    {slides.map((item, index) => (
                                        <SwiperSlide key={index} className={cx('slide')}>
                                            <Link to={`${routes.services}/${item.subcategorySlug}/${item._id}`}>
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
                    <ButtonGroup buttons={['Xem nhiều', 'Nổi bật']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredServiceItems.map((item, index) => (
                            <Link key={index} to={`${routes.services}/${getCategorySlug(item.categoryId)}/${item._id}`}>
                                <SuggestCard
                                    title={item.name}
                                    summary={item.summary}
                                    image={item.image[0]}
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
};

export default Service;
