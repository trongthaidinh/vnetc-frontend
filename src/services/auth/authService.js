import httpRequest from '~/utils/httpRequest';

export const login = async (credentials) => {
    try {
        const response = await httpRequest.post('/authenticate/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await httpRequest.post('/authenticate/logout');
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async (id) => {
    try {
        const response = await httpRequest.get(`/account/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
