import httpRequest from '~/utils/httpRequest';

export const getTeams = async () => {
    try {
        const response = await httpRequest.get('/teams');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching teams', error);
        throw error;
    }
};

export const getDepartments = async () => {
    try {
        const response = await httpRequest.get('/department');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching departments', error);
        throw error;
    }
};

export const getDepartmentMembers = async (departmentId) => {
    try {
        const response = await httpRequest.get(`/department/${departmentId}/members`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching department members', error);
        throw error;
    }
};
