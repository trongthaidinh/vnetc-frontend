import httpRequest from '~/utils/httpRequest';

export const getServices = async () => {
    try {
        const response = await httpRequest.get(`/services`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getServicesPagiation = async (page = 1, limit = 8) => {
    try {
        const response = await httpRequest.get(`/services?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getServiceById = async (id) => {
    try {
        const response = await httpRequest.get(`/services/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service detail with id ${id}`, error);
        throw error;
    }
};

export const getServiceByType = async (type) => {
    try {
        const response = await httpRequest.get(`/services?type=${type}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service for id=${type}:`, error);
        throw error;
    }
};
