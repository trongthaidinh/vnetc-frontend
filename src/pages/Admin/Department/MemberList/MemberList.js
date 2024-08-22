import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteMember, getDepartmentMembers, getDepartments } from '~/services/teamService';
import styles from './MemberList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const MemberList = () => {
    const [, setDepartments] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchDepartmentsAndMembers = async () => {
            try {
                const departmentsData = await getDepartments();
                setDepartments(departmentsData);

                if (departmentsData.length > 0) {
                    const allMembers = await Promise.all(
                        departmentsData.map(async (department) => {
                            const members = await getDepartmentMembers(department._id);
                            return members.map((member) => ({
                                ...member,
                                departmentId: department._id,
                            }));
                        }),
                    );
                    setMembers(allMembers.flat());
                } else {
                    setNotification({ message: 'Không có dữ liệu đội ngũ.', type: 'success' });
                }
            } catch (error) {
                console.error('Error fetching departments or members:', error);
                setNotification({ message: 'Lỗi khi tải dữ liệu đội ngũ.', type: 'error' });
            }
        };

        fetchDepartmentsAndMembers();
    }, []);

    const handleDelete = async (id, departmentId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thành viên này không?')) {
            try {
                await deleteMember(id, departmentId);
                setMembers(members.filter((member) => member._id !== id));
                setNotification({ message: 'Xóa thành viên thành công!', type: 'success' });
            } catch (error) {
                console.error('Error deleting member:', error);
                setNotification({ message: 'Có lỗi xảy ra khi xóa thành viên.', type: 'error' });
            }
        }
    };

    const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const indexOfLastMember = currentPage * itemsPerPage;
    const indexOfFirstMember = indexOfLastMember - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <div className={styles.memberContainer}>
            <Title className={styles.pageTitle} text="Danh sách Đội ngũ" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Đội ngũ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addMember} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Đội ngũ
                </Link>
            </div>

            <div className={styles.memberList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Ban</th>
                            <th>Năm sinh</th>
                            <th>Vị trí</th>
                            <th>Kinh Nghiệm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMembers.length > 0 ? (
                            currentMembers.map((member) => (
                                <tr key={member._id}>
                                    <td>
                                        <img src={member.image} alt={member.name} className={styles.memberImage} />
                                    </td>
                                    <td>{member.name}</td>
                                    <td>
                                        {member.position === 0
                                            ? 'Ban lãnh đạo'
                                            : member.position === 1
                                            ? 'Nhân viên'
                                            : 'Đội công trình'}
                                    </td>
                                    <td>{member.yearOfBirth}</td>
                                    <td>{member.qualification}</td>
                                    <td>{member.seniority} năm</td> {/* Hiển thị năm kinh nghiệm */}
                                    <td>
                                        <Link
                                            to={`/admin/update-member/${member._id}/${member.departmentId}`}
                                            className={styles.editButton}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member._id, member.departmentId)}
                                            className={styles.deleteButton}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Không có dữ liệu</td>
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
                    Hiện {indexOfFirstMember + 1} đến {Math.min(indexOfLastMember, filteredMembers.length)} của{' '}
                    {filteredMembers.length}
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
