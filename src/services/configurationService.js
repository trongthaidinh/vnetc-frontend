import httpRequest from '~/utils/httpRequest';

export const getConfiguration = async () => {
    try {
        const response = await httpRequest.get('/configuration');
        return response.data.data[0];
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const updateConfiguration = async (data) => {
    try {
        const response = await httpRequest.patch('/configuration', { data });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};
