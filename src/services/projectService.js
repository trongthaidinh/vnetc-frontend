import httpRequest from '~/utils/httpRequest';

export const getProjects = async () => {
    try {
        const response = await httpRequest.get(`/project`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching project', error);
        throw error;
    }
};

export const getProjectsPagiation = async (page = 1, limit = 6) => {
    try {
        const response = await httpRequest.get(`/project?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching project', error);
        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const response = await httpRequest.get(`/project/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching project detail with id ${id}`, error);
        throw error;
    }
};

export const getProjectByType = async (type) => {
    try {
        const response = await httpRequest.get(`/project?type=${type}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching project for id=${type}:`, error);
        throw error;
    }
};

export const addProject = async (projectData) => {
    try {
        const response = await httpRequest.post('/project', projectData);
        return response.data;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};

export const updateProject = async (id, projectData) => {
    try {
        const response = await httpRequest.patch(`/project/${id}`, projectData);
        return response.data;
    } catch (error) {
        console.error(`Error updating project with ID ${id}:`, error);
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        const response = await httpRequest.delete(`/project/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting project with ID ${id}:`, error);
        throw error;
    }
};
