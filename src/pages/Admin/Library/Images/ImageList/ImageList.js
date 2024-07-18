import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { deleteImage, getImages } from '~/services/libraryService';
import styles from './ImageList.module.scss';
import Title from '~/components/Title';

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const data = await getImages();
            if (data) {
                setImages(data);
            } else {
                alert('Failed to fetch images.');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            alert('Failed to fetch images.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await deleteImage(id);
                setImages(images.filter((image) => image._id !== id));
                alert('Image deleted successfully!');
            } catch (error) {
                console.error('Error deleting image:', error);
                alert('There was an error deleting the image.');
            }
        }
    };

    const filteredImages = images.filter((image) => image.image.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

    return (
        <div className={styles.imageContainer}>
            <Title className={styles.pageTitle} text="Danh sách Image" />
            <div className={styles.actionsContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm Image..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.imageList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentImages.length > 0 ? (
                            currentImages.map((image) => (
                                <tr key={image._id}>
                                    <td>
                                        <a href={image.image} target="_blank" rel="noopener noreferrer">
                                            {image.image}
                                        </a>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(image._id)} className={styles.deleteButton}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <span>
                    Hiển thị {indexOfFirstImage + 1} đến {Math.min(indexOfLastImage, filteredImages.length)} của{' '}
                    {filteredImages.length}
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

export default ImageList;
