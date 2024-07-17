import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getProductsByCategory } from '~/services/productService';
import styles from './Product.module.scss';
import Title from '~/components/Title';
import ButtonGroup from '~/components/ButtonGroup';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import { getCategoriesByType } from '~/services/categoryService';
import Product from '~/components/Product';
import SuggestCard from '~/components/SuggestCard';

const cx = classNames.bind(styles);

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const categoriesData = await getCategoriesByType(1); // Assuming type 1 is for products
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

    const handleButtonClick = (index) => {
        setSelectedSuggestion(index);
    };
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

    const filteredProductItems = products
        .filter((item) => {
            if (selectedSuggestion === 0) {
                return item.isFeatured;
            }
            if (selectedSuggestion === 1) {
                return item.isFeatured;
            }
            return true;
        })
        .slice(0, 5);

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
                <div className={cx('suggest')}>
                    <h2 className={cx('suggest-title')}>Có thể bạn quan tâm</h2>
                    <ButtonGroup buttons={['Nổi bật', 'Xem nhiều']} onButtonClick={handleButtonClick} />
                    <div className={cx('suggest-items')}>
                        {filteredProductItems.map((item, index) => (
                            <Link key={index} to={`/products/${item._id}`}>
                                <SuggestCard title={item.name} image={item.image[0]} createdAt={item.createdAt} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Products;
