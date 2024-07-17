import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getProducts, deleteProduct } from '~/services/productService';
import styles from './ProductList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            if (data) {
                setProducts(data);
            } else {
                alert('Failed to fetch products.');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((prod) => prod._id !== id));
                alert('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('There was an error deleting the product.');
            }
        }
    };

    const filteredProducts = products.filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastProd = currentPage * itemsPerPage;
    const indexOfFirstProd = indexOfLastProd - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProd, indexOfLastProd);

    return (
        <div className={styles.productContainer}>
            <Title className={styles.pageTitle} text="Danh sách Sản phẩm" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addProduct} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Sản phẩm
                </Link>
            </div>

            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((prod) => (
                                <tr key={prod._id}>
                                    <td>{prod.name}</td>
                                    <td>
                                        <img src={prod.image[0]} alt={prod.name} className={styles.productImage} />
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit-product/${prod._id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button onClick={() => handleDelete(prod._id)} className={styles.deleteButton}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Items per page selection */}
            <div className={styles.itemsPerPageContainer}>
                <label htmlFor="itemsPerPage">Số mục mỗi trang:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when items per page changes
                    }}
                    className={styles.itemsPerPageSelect}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstProd + 1} đến {Math.min(indexOfLastProd, filteredProducts.length)} của{' '}
                    {filteredProducts.length}
                </span>
                <div className={styles.paginationControls}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
