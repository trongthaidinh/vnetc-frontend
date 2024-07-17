import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getNews, deleteNews, getNewsAll } from '~/services/newsService';
import styles from './NewsList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNewsAll();
            if (data) {
                setNews(data);
            } else {
                alert('Failed to fetch news.');
            }
        };

        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            try {
                await deleteNews(id);
                setNews(news.filter((article) => article._id !== id));
                alert('News article deleted successfully!');
            } catch (error) {
                console.error('Error deleting news article:', error);
                alert('There was an error deleting the news article.');
            }
        }
    };

    const filteredNews = news.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

    return (
        <div className={styles.newsContainer}>
            <Title className={styles.pageTitle} text="Danh sách Tin tức" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Tin tức..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addNews} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Tin tức
                </Link>
            </div>

            <div className={styles.newsList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Tóm tắt</th>
                            <th>Số lượt xem</th>
                            <th>Nổi bật</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentNews.length > 0 ? (
                            currentNews.map((article) => (
                                <tr key={article._id}>
                                    <td>{article.title}</td>
                                    <td>{article.summary}</td>
                                    <td>{article.views}</td>
                                    <td>{article.isFeatured ? 'Có' : 'Không'}</td>
                                    <td>
                                        <img src={article.images} alt={article.title} className={styles.newsImage} />
                                    </td>
                                    <td>
                                        <Link to={`/admin/update-news/${article._id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Không có dữ liệu</td>
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
                    Hiện {indexOfFirstNews + 1} đến {Math.min(indexOfLastNews, filteredNews.length)} của{' '}
                    {filteredNews.length}
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

export default NewsList;
