import httpRequest from '~/utils/httpRequest';

export const getLegals = async () => {
    try {
        const response = await httpRequest.get(`/document`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching legal', error);
        throw error;
    }
};

export const getLegalsPagiation = async (page = 1, limit = 8) => {
    try {
        const response = await httpRequest.get(`/document?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching legal', error);
        throw error;
    }
};

export const getLegalById = async (id) => {
    try {
        const response = await httpRequest.get(`/document/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching legal detail with id ${id}`, error);
        throw error;
    }
};

export const getLegalByType = async (type) => {
    try {
        const response = await httpRequest.get(`/document/type/${type}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching legal for id=${type}:`, error);
        throw error;
    }
};

export const addLegal = async (legalData) => {
    try {
        const response = await httpRequest.post('/document', legalData);
        return response.data;
    } catch (error) {
        console.error('Error adding legal:', error);
        throw error;
    }
};

export const updateLegal = async (id, legalData) => {
    try {
        const response = await httpRequest.patch(`/document/${id}`, legalData);
        return response.data;
    } catch (error) {
        console.error(`Error updating legal with ID ${id}:`, error);
        throw error;
    }
};

export const deleteLegal = async (id) => {
    try {
        const response = await httpRequest.delete(`/document/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting legal with ID ${id}:`, error);
        throw error;
    }
};
