import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Products.module.scss';
import Product from '~/components/Product';
import { getProductsByCategory } from '~/services/productService';
import { getCategoriesByType } from '~/services/categoryService';
import Title from '~/components/Title';

const cx = classNames.bind(styles);

function Products() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const extractSlugFromPathname = (pathname) => {
        const parts = pathname.split('/');
        return parts.length > 2 ? parts[2] : null;
    };

    const slug = extractSlugFromPathname(location.pathname);

    const getCategorySlug = (categoryId) => {
        const category = categories.find((cat) => cat._id === categoryId);
        return category ? category.slug : 'unknown';
    };

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categories = await getCategoriesByType(1);
                setCategories(categories);
                const category = categories.find((cat) => cat.slug === slug);
                if (category) {
                    setCategoryId(category._id);
                    setCategoryName(category.name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        if (slug) {
            fetchCategory();
        }
    }, [slug]);

    useEffect(() => {
        async function fetchProductsCategory() {
            if (categoryId) {
                try {
                    const data = await getProductsByCategory(categoryId);
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        }

        fetchProductsCategory();
    }, [categoryId]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderProducts = () => {
        return currentProducts.map((product) => (
            <Product
                key={product._id}
                image={product.image[0]}
                name={product.name}
                productId={product._id}
                category={getCategorySlug(product.category_id)}
            />
        ));
    };

    const renderPagination = () => {
        return (
            <div className={cx('pagination')}>
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div
                        key={index}
                        className={cx('pageButton', { active: currentPage === index + 1 })}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className={cx('pageButton')} onClick={() => handlePageChange(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Title text={categoryName} />
            <div className={cx('productGrid')}>{renderProducts()}</div>
            {renderPagination()}
        </div>
    );
}

export default Products;
