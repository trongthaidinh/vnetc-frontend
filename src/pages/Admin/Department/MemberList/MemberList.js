import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteDepartmentMembers, getDepartmentMembers } from '~/services/teamService';
import styles from './MemberList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const MemberList = () => {
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartmentMembers();
            if (data) {
                setDepartments(data);
            } else {
                alert('Failed to fetch departments.');
            }
        };

        fetchDepartments();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartmentMembers(id);
                setDepartments(departments.filter((department) => department._id !== id));
                alert('Department deleted successfully!');
            } catch (error) {
                console.error('Error deleting department:', error);
                alert('There was an error deleting the department.');
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
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Phòng ban..."
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
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Vị trí</th>
                            <th>Năm sinh</th>
                            <th>Bằng cấp</th>
                            <th>Người tạo</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartments.length > 0 ? (
                            currentDepartments.map((department) => (
                                <tr key={department._id}>
                                    <td>
                                        <img
                                            src={department.image}
                                            alt={department.name}
                                            className={styles.departmentImage}
                                        />
                                    </td>
                                    <td>{department.name}</td>
                                    <td>{department.position === 1 ? 'Ban lãnh đạo' : 'Đội công trình'}</td>
                                    <td>{department.yearOfBirth}</td>
                                    <td>{department.qualification}</td>
                                    <td>{department.createdBy}</td>
                                    <td>{new Date(department.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <Link
                                            to={`/admin/update-department/${department._id}`}
                                            className={styles.editButton}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
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
                                <td colSpan="8">Không có dữ liệu</td>
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

export default MemberList;
