import httpRequest from '~/utils/httpRequest';

export const getNews = async () => {
    try {
        const response = await httpRequest.get('/news');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
