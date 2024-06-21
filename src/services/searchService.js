import httpRequest from '~/utils/httpRequest';

export const searchItems = async (query) => {
    try {
        const response = await httpRequest.get(`/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};
