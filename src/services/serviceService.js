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

export const getServicesPagiation = async (page = 1, limit = 1000) => {
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

export const getServiceByCategory = async (categoryId, page = 1, limit = 10) => {
    try {
        const response = await httpRequest.get('/services', {
            params: {
                categoryId,
                page,
                limit,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching services for id=${categoryId}:`, error);
        throw error;
    }
};

export const addService = async (serviceData) => {
    try {
        const response = await httpRequest.post('/services', serviceData);
        return response.data;
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};

export const updateService = async (id, serviceData) => {
    try {
        const response = await httpRequest.patch(`/services/${id}`, serviceData);
        return response.data;
    } catch (error) {
        console.error(`Error updating service with ID ${id}:`, error);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        const response = await httpRequest.delete(`/services/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting service with ID ${id}:`, error);
        throw error;
    }
};
