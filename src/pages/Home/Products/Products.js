import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Product from '~/components/Product';
import { getProducts } from '~/services/productService';
import { getCategoriesByType } from '~/services/categoryService';
import styles from './Products.module.scss';
import Title from '~/components/Title';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';

const cx = classNames.bind(styles);

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productsData = await getProducts();
                const categoriesData = await getCategoriesByType(1);
                setProducts(productsData);
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
                <Title text="Sản phẩm nổi bật" />
                <div className={cx('product-list')}>
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            image={product.image[0]}
                            name={product.name}
                            productId={product._id}
                            category={getCategorySlug(product.category_id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
