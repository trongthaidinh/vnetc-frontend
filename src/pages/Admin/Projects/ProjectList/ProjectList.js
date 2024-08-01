import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getProjects, deleteProject } from '~/services/projectService';
import styles from './ProjectList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';
import PushNotification from '~/components/PushNotification';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            if (data) {
                setProjects(data);
            } else {
                setNotification({ message: 'Failed to fetch projects.', type: 'error' });
            }
        };

        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này không?')) {
            try {
                await deleteProject(id);
                setProjects(projects.filter((project) => project._id !== id));
                setNotification({ message: 'Xóa dự án thành công!', type: 'success' });
            } catch (error) {
                console.error('Error deleting project:', error);
                setNotification({ message: 'Đã xảy ra lỗi khi xóa dự án.', type: 'error' });
            }
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    return (
        <div className={styles.projectContainer}>
            <Title className={styles.pageTitle} text="Danh sách Dự án" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Dự án..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addProject} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Dự án
                </Link>
            </div>

            <div className={styles.projectList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên dự án</th>
                            <th>Tóm tắt</th>
                            <th>Số lượt xem</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <tr key={project._id}>
                                    <td>{project.name}</td>
                                    <td>{project.summary}</td>
                                    <td>{project.views}</td>
                                    <td>
                                        <img src={project.image} alt={project.name} className={styles.projectImage} />
                                    </td>
                                    <td>
                                        <Link to={`/admin/update-project/${project._id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project._id)}
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
                    Hiện {indexOfFirstProject + 1} đến {Math.min(indexOfLastProject, filteredProjects.length)} của{' '}
                    {filteredProjects.length}
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

export default ProjectList;
