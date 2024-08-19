import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteDepartment, getDepartments } from '~/services/teamService';
import styles from './DepartmentList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const departmentsData = await getDepartments();
                setDepartments(departmentsData);
            } catch (error) {
                console.error('Error fetching departments:', error);
                setNotification({ message: 'Lỗi khi tải dữ liệu phòng ban.', type: 'error' });
            }
        };

        fetchDepartments();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phòng ban này không?')) {
            try {
                await deleteDepartment(id);
                setDepartments(departments.filter((department) => department._id !== id));
                setNotification({ message: 'Xóa phòng ban thành công!', type: 'success' });
            } catch (error) {
                console.error('Error deleting department:', error);
                setNotification({ message: 'Có lỗi xảy ra khi xóa phòng ban.', type: 'error' });
            }
        }
    };

    const filteredDepartments = departments.filter((department) =>
        department.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
    const indexOfLastDepartment = currentPage * itemsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
    const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

    return (
        <div className={styles.departmentContainer}>
            <Title className={styles.pageTitle} text="Danh sách Phòng ban" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm phòng ban..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addDepartment} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Phòng ban
                </Link>
            </div>

            <div className={styles.departmentList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên Phòng ban</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartments.length > 0 ? (
                            currentDepartments.map((department) => (
                                <tr key={department._id}>
                                    <td>{department.name}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(department._id)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Không có dữ liệu phòng ban</td>
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
                    Hiện {indexOfFirstDepartment + 1} đến {Math.min(indexOfLastDepartment, filteredDepartments.length)}{' '}
                    của {filteredDepartments.length}
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

export default DepartmentList;
