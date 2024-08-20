import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Product from '~/components/Product';
import { getCategoriesByType } from '~/services/categoryService';
import styles from './Products.module.scss';
import Title from '~/components/Title';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import routes from '~/config/routes';
import { getServicesPagiation } from '~/services/serviceService';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productsData = await getServicesPagiation(3, 8);
                const categoriesData = await getCategoriesByType(3);

                const sortedProducts = productsData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                setProducts(sortedProducts);
                setCategories(categoriesData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId);
        return category ? category.slug : 'unknown';
    };

    if (error) {
        return <PushNotification message={error.message} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Title text="Sản Phẩm & Dịch Vụ" showSeeAll={true} slug={`${routes.services}`} />
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
                    {products.map((product) => (
                        <SwiperSlide key={product._id} className={cx('slide')}>
                            <Product
                                image={product.image}
                                name={product.name}
                                productId={product._id}
                                category={getCategorySlug(product.category_id)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Products;
