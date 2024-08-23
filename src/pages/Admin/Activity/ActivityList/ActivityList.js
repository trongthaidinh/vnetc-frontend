import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteActivity, getActivityPagination } from '~/services/activityService';
import styles from './ActivityList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const ActivityList = () => {
    const [activity, setActivity] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await getActivityPagination(currentPage, itemsPerPage);
                if (response) {
                    setActivity(response.actions);
                    setTotalPages(response.totalPages);
                } else {
                    setNotification({ message: 'Failed to fetch activity.', type: 'error' });
                }
            } catch (error) {
                console.error('Error fetching activity:', error);
                setNotification({ message: 'Error fetching activity.', type: 'error' });
            }
        };

        fetchActivity();
    }, [currentPage, itemsPerPage]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hoạt động này?')) {
            try {
                await deleteActivity(id);
                setActivity(activity.filter((article) => article._id !== id));
                setNotification({ message: 'Hoạt động đã được xóa thành công!', type: 'success' });
            } catch (error) {
                console.error('Có lỗi khi xóa hoạt động:', error);
                setNotification({ message: 'Đã xảy ra lỗi khi xóa hoạt động!', type: 'error' });
            }
        }
    };

    const filteredActivity = activity.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const indexOfLastActivity = currentPage * itemsPerPage;
    const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;

    return (
        <div className={styles.activityContainer}>
            <Title className={styles.pageTitle} text="Danh sách Hoạt động" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Hoạt động..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addActivity} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Hoạt động
                </Link>
            </div>

            <div className={styles.activityList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Tóm tắt</th>
                            <th>Nổi bật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activity.length > 0 ? (
                            activity.map((article) => (
                                <tr key={article._id}>
                                    <td>
                                        <img
                                            src={article.images}
                                            alt={article.title}
                                            className={styles.activityImage}
                                        />
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.summary}</td>
                                    <td>{article.isFeatured ? 'Có' : 'Không'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/update-activity/${article._id}`}
                                            className={styles.editButton}
                                        >
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
                                <td colSpan="5">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.itemsPerPageContainer}>
                <label htmlFor="itemsPerPage">Số mục mỗi trang:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className={styles.itemsPerPageSelect}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstActivity + 1} đến {Math.min(indexOfLastActivity, filteredActivity.length)} của{' '}
                    {filteredActivity.length}
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

export default ActivityList;
