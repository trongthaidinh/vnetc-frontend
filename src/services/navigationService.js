import httpRequest from '~/utils/httpRequest';

export const getNavigationLinks = async () => {
    try {
        const response = await httpRequest.get('/navigation');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

export const createNavigationLink = async (data) => {
    try {
        const response = await httpRequest.post('/navigation', data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating navigation link:', error);
        throw error;
    }
};

export const updateNavigationLink = async (id, data) => {
    try {
        const response = await httpRequest.put(`/navigation/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error updating navigation link:', error);
        throw error;
    }
};

export const deleteNavigationLink = async (id) => {
    try {
        await httpRequest.delete(`/navigation/${id}`);
    } catch (error) {
        console.error('Error deleting navigation link:', error);
        throw error;
    }
};
