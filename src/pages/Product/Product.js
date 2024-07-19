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
                        console.log(productsData);
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
            <div className={cx('products-section')}>
                <div className={cx('products-column')}>
                    <h2 className={cx('products-title')}>Sản Phẩm</h2>
                    {categories.map((category) => (
                        <div key={category._id} className={cx('products-category')}>
                            <Title
                                text={category.name || 'Loading...'}
                                showSeeAll={true}
                                slug={`${routes.products}/${category.slug}`}
                                categoryId={category._id}
                            />
                            <div className={cx('products-items')}>
                                {groupedProducts[category._id]?.slice(0, 6).map((item) => (
                                    <Product
                                        name={item.name}
                                        image={item.image[0]}
                                        price={item.price}
                                        views={item.views}
                                        productId={item._id}
                                        category={getCategorySlug(item.category_id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default Products;
