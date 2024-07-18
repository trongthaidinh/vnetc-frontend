import httpRequest from '~/utils/httpRequest';

const API_URL = '/account';

export const getUsers = async () => {
    try {
        const response = await httpRequest.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await httpRequest.post(API_URL, userData);
        return response.data.data; // Có thể return response.data.data nếu backend trả về dữ liệu chi tiết sau khi thêm người dùng
    } catch (error) {
        console.error('Error adding user', error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await httpRequest.patch(`${API_URL}/${userId}`, userData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating user ${userId}`, error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await httpRequest.get(`${API_URL}/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating user ${userId}`, error);
        throw error;
    }
};

export const deleteUser = async (id, accDelId) => {
    try {
        const response = await httpRequest.delete(`${API_URL}`, { id, accDelId });
        return response.data.data; // Có thể return response.data.data nếu backend trả về dữ liệu chi tiết sau khi xóa người dùng
    } catch (error) {
        console.error(`Error deleting user ${id}`, error);
        throw error;
    }
};
