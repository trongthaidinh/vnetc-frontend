import httpRequest from '~/utils/httpRequest';

export const getProjects = async () => {
    try {
        const response = await httpRequest.get(`/project`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getProjectsPagiation = async (page = 1, limit = 8) => {
    try {
        const response = await httpRequest.get(`/project?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching service', error);
        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const response = await httpRequest.get(`/project/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service detail with id ${id}`, error);
        throw error;
    }
};

export const getProjectByType = async (type) => {
    try {
        const response = await httpRequest.get(`/project?type=${type}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching service for id=${type}:`, error);
        throw error;
    }
};
