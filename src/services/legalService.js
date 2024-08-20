import httpRequest from '~/utils/httpRequest';

export const getLegals = async () => {
    try {
        const response = await httpRequest.get(`/legals`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching legal', error);
        throw error;
    }
};

export const getLegalsPagiation = async (page = 1, limit = 8) => {
    try {
        const response = await httpRequest.get(`/legals?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching legal', error);
        throw error;
    }
};

export const getLegalById = async (id) => {
    try {
        const response = await httpRequest.get(`/legals/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching legal detail with id ${id}`, error);
        throw error;
    }
};

export const getLegalByType = async (type) => {
    try {
        const response = await httpRequest.get(`/legals?type=${type}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching legal for id=${type}:`, error);
        throw error;
    }
};

export const addLegal = async (legalData) => {
    try {
        const response = await httpRequest.post('/legals', legalData);
        return response.data;
    } catch (error) {
        console.error('Error adding legal:', error);
        throw error;
    }
};

export const updateLegal = async (id, legalData) => {
    try {
        const response = await httpRequest.patch(`/legals/${id}`, legalData);
        return response.data;
    } catch (error) {
        console.error(`Error updating legal with ID ${id}:`, error);
        throw error;
    }
};

export const deleteLegal = async (id) => {
    try {
        const response = await httpRequest.delete(`/legals/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting legal with ID ${id}:`, error);
        throw error;
    }
};
