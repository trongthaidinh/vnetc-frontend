import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getProductsByCategory } from '~/services/productService';
import styles from './Product.module.scss';
import Title from '~/components/Title';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';
import Product from '~/components/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const Products = () => {
    const [, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const categoriesData = await getCategoriesByType(1);
                setCategories(categoriesData);

                const groupedProductsMap = {};

                await Promise.all(
                    categoriesData.map(async (category) => {
                        const productsData = await getProductsByCategory(category._id);
                        groupedProductsMap[category._id] = productsData.map((item) => ({
                            ...item,
                        }));
                    }),
                );

                setGroupedProducts(groupedProductsMap);
                setProducts(Object.values(groupedProductsMap).flat());
            } catch (error) {
                setError(error);
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId);
        return category ? category.slug : 'unknown';
    };

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
                <title>Sản Phẩm | VNETC</title>
                <meta name="description" content="Xem các sản phẩm điện lực chất lượng cao tại VNETC." />
                <meta name="keywords" content="sản phẩm điện lực, kiểm thử, VNETC, chất lượng cao" />
            </Helmet>
            <div className={cx('products-section')}>
                <div className={cx('products-column')}>
                    <h2 className={cx('products-title')}>Sản Phẩm</h2>
                    {categories.map((category) => {
                        const productsInCategory = groupedProducts[category._id];

                        if (!productsInCategory || productsInCategory.length === 0) {
                            return null;
                        }

                        const shouldLoop = productsInCategory.length > 3;

                        return (
                            <div key={category._id} className={cx('products-category')}>
                                <Title
                                    text={category.name || 'Loading...'}
                                    showSeeAll={true}
                                    slug={`${routes.products}/${category.slug}`}
                                    categoryId={category._id}
                                />
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    breakpoints={{
                                        1280: { slidesPerView: 4 },
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
                                    {productsInCategory.slice(0, 6).map((item) => (
                                        <SwiperSlide key={item._id} className={cx('slide')}>
                                            <Product
                                                name={item.name}
                                                image={item.image[0]}
                                                price={item.price}
                                                views={item.views}
                                                productId={item._id}
                                                category={getCategorySlug(item.category_id)}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        );
                    })}
                </div>
            </div>
        </article>
    );
};

export default Products;
