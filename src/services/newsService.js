import httpRequest from '~/utils/httpRequest';

export const getNews = async (page = 1, limit = 8) => {
    try {
        const response = await httpRequest.get(`/news?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news', error);
        throw error;
    }
};

export const getNewsById = async (id, categoryId) => {
    try {
        const response = await httpRequest.get(`/news/${categoryId}/${id}`);
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
        console.error(`Error fetching news for id=${categoryId}:`, error);
        throw error;
    }
};
