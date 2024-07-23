import httpRequest from '~/utils/httpRequest';

// Members
export const getDepartmentMembers = async (departmentId) => {
    try {
        const response = await httpRequest.get(`/department/${departmentId}/members`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching department members', error);
        throw error;
    }
};

export const addMember = async (memberData, departmentId) => {
    console.log(memberData);
    try {
        const response = await httpRequest.post(`/department/${departmentId}`, memberData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding member', error);
        throw error;
    }
};

export const updateMember = async (memberId, departmentId, memberData) => {
    try {
        const response = await httpRequest.patch(`department/${departmentId}/members/${memberId}`, memberData);
        return response.data;
    } catch (error) {
        console.error('Error updating member', error);
        throw error;
    }
};

export const getMemberById = async (memberId, departmentId) => {
    try {
        const response = await httpRequest.get(`department/${departmentId}/members/${memberId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting member', error);
        throw error;
    }
};

export const deleteMember = async (memberId, departmentId) => {
    try {
        const response = await httpRequest.delete(`department/${departmentId}/members/${memberId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting member', error);
        throw error;
    }
};

//Department

export const getDepartments = async () => {
    try {
        const response = await httpRequest.get('/department');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching departments', error);
        throw error;
    }
};

export const addDepartment = async (departmentData) => {
    try {
        const response = await httpRequest.post('/department', departmentData);
        return response.data;
    } catch (error) {
        console.error('Error adding department', error);
        throw error;
    }
};

export const updateDepartment = async (departmentId, departmentData) => {
    try {
        const response = await httpRequest.put(`/department/${departmentId}`, departmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating department', error);
        throw error;
    }
};

export const deleteDepartment = async (departmentId) => {
    try {
        const response = await httpRequest.delete(`/department/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting department', error);
        throw error;
    }
};
