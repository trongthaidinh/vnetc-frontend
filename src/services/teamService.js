import httpRequest from '~/utils/httpRequest';

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

export const deleteDepartmentMembers = async (departmentId) => {
    try {
        const response = await httpRequest.get(`/department/${departmentId}/members`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching department members', error);
        throw error;
    }
};
