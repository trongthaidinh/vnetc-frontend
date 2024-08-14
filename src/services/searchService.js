import httpRequest from '~/utils/httpRequest';

export const getSearchProject = async (search, limit = 10, page = 1) => {
    try {
        const response = await httpRequest.get(`/project/search?data=${search}&limit=${limit}&page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results', error);
        throw error;
    }
};

export const getSearchNews = async (search, limit = 10, page = 1) => {
    try {
        const response = await httpRequest.get(`/news/search?data=${search}&limit=${limit}&page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results', error);
        throw error;
    }
};

export const getSearchProduct = async (search, limit = 10, page = 1) => {
    try {
        const response = await httpRequest.get(`/product/search?data=${search}&limit=${limit}&page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results', error);
        throw error;
    }
};

export const getSearchService = async (search, limit = 10, page = 1) => {
    try {
        const response = await httpRequest.get(`/services/search?data=${search}&limit=${limit}&page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results', error);
        throw error;
    }
};

export const searchItems = async (query, limit = 8, page = 1) => {
    try {
        const response = await httpRequest.get(`/news/search?data=${query}&limit=${limit}&page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};
