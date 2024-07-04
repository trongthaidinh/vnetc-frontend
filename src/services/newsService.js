import httpRequest from '~/utils/httpRequest';

export const getNews = async () => {
    try {
        const response = await httpRequest.get('/news');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

export const getNewsById = async (id) => {
    try {
        const response = await httpRequest.get(`/news/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching news detail with id ${id}`, error);
        throw error;
    }
};

export const getNewsByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/news?categoryId=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching news for categoryId=${categoryId}:`, error);
        throw error;
    }
};
