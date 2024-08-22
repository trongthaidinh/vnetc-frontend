import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getLegals, deleteLegal } from '~/services/legalService';
import styles from './LegalList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const LegalList = () => {
    const [legals, setLegals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchLegals = async () => {
            const data = await getLegals();
            if (data) {
                setLegals(data);
            } else {
                setNotification({ message: 'Failed to fetch legals.', type: 'error' });
            }
        };

        fetchLegals();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa văn bản pháp quy này không?')) {
            try {
                await deleteLegal(id);
                setLegals(legals.filter((legal) => legal._id !== id));
                setNotification({ message: 'Xóa văn bản pháp quy thành công!', type: 'success' });
            } catch (error) {
                console.error('Error deleting legal:', error);
                setNotification({ message: 'Đã xảy ra lỗi khi xóa văn bản pháp quy.', type: 'error' });
            }
        }
    };

    const filteredLegals = legals.filter((legal) => legal.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredLegals.length / itemsPerPage);
    const indexOfLastLegal = currentPage * itemsPerPage;
    const indexOfFirstLegal = indexOfLastLegal - itemsPerPage;
    const currentLegals = filteredLegals.slice(indexOfFirstLegal, indexOfLastLegal);

    return (
        <div className={styles.legalContainer}>
            <Title className={styles.pageTitle} text="Danh sách Văn bản pháp quy" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Văn bản pháp quy..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addLegal} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Văn bản pháp quy
                </Link>
            </div>

            <div className={styles.legalList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên văn bản pháp quy</th>
                            <th>Tóm tắt</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLegals.length > 0 ? (
                            currentLegals.map((legal) => {
                                const imageUrl = legal.attachments
                                    ? `${process.env.REACT_APP_HOST}/${legal.attachments
                                          .find((attachment) => attachment.file_type === 'img')
                                          ?.file_url.replace(/\\/g, '/')}`
                                    : null;
                                return (
                                    <tr key={legal._id}>
                                        <td>
                                            <img
                                                src={
                                                    imageUrl ||
                                                    'https://res.cloudinary.com/ddmzboxzu/image/upload/v1724202469/cer_3_ldetgd.png'
                                                }
                                                alt={legal.title}
                                                className={styles.legalImage}
                                            />
                                        </td>
                                        <td>{legal.title}</td>
                                        <td>{legal.content}</td>
                                        <td>
                                            <Link to={`/admin/update-legal/${legal._id}`} className={styles.editButton}>
                                                <FontAwesomeIcon icon={faEdit} /> Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(legal._id)}
                                                className={styles.deleteButton}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
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
                    Hiện {indexOfFirstLegal + 1} đến {Math.min(indexOfLastLegal, filteredLegals.length)} của{' '}
                    {filteredLegals.length}
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

export default LegalList;
