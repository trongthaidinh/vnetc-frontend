import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { getServices, deleteService } from '~/services/serviceService';
import styles from './ServiceList.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            if (data) {
                setServices(data);
            } else {
                alert('Failed to fetch services.');
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                setServices(services.filter((service) => service._id !== id));
                alert('Service deleted successfully!');
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('There was an error deleting the service.');
            }
        }
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const indexOfLastService = currentPage * itemsPerPage;
    const indexOfFirstService = indexOfLastService - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    return (
        <div className={styles.serviceContainer}>
            <Title className={styles.pageTitle} text="Danh sách Dịch vụ" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Dịch vụ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link to={routes.addService} className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới Dịch vụ
                </Link>
            </div>

            <div className={styles.serviceList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Tóm tắt</th>
                            <th>Số lượt xem</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentServices.length > 0 ? (
                            currentServices.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.name}</td>
                                    <td>{service.summary}</td>
                                    <td>{service.views}</td>
                                    <td>
                                        <img src={service.image} alt={service.name} className={styles.serviceImage} />
                                    </td>
                                    <td>
                                        <Link to={`/admin/update-service/${service._id}`} className={styles.editButton}>
                                            <FontAwesomeIcon icon={faEdit} /> Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service._id)}
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

            {/* Pagination */}
            <div className={styles.pagination}>
                <span>
                    Hiện {indexOfFirstService + 1} đến {Math.min(indexOfLastService, filteredServices.length)} của{' '}
                    {filteredServices.length}
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

export default ServiceList;
