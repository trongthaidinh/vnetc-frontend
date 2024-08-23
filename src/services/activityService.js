import httpRequest from '~/utils/httpRequest';

export const getActivityPagination = async (page = 1, limit = 4) => {
    try {
        const response = await httpRequest.get(`/activity?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching activity', error);
        throw error;
    }
};

export const getActivity = async () => {
    try {
        const response = await httpRequest.get(`/activity`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching activity', error);
        throw error;
    }
};

export const getActivityAll = async () => {
    try {
        const response = await httpRequest.get('/activity');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching activity', error);
        throw error;
    }
};

export const getFeaturedActivity = async () => {
    try {
        const response = await httpRequest.get('/activity/featured');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching activity', error);
        throw error;
    }
};

export const getTopViews = async () => {
    try {
        const response = await httpRequest.get('/activity/views');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching activity', error);
        throw error;
    }
};

export const getActivityById = async (id) => {
    try {
        const response = await httpRequest.get(`/activity/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching activity detail with id ${id}`, error);
        throw error;
    }
};

export const getActivityByCategory = async (categoryId, startDate = '', endDate = '', page = 1, limit = 10) => {
    try {
        const response = await httpRequest.get('/activity', {
            params: {
                categoryId,
                startDate,
                endDate,
                page,
                limit,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching activity for id=${categoryId}:`, error);
        throw error;
    }
};

export const createActivity = async (activityData) => {
    try {
        const response = await httpRequest.post('/activity', activityData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding activity', error);
        throw error;
    }
};

export const updateActivity = async (id, activityData) => {
    try {
        const response = await httpRequest.patch(`/activity/${id}`, activityData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating activity with id ${id}`, error);
        throw error;
    }
};

export const deleteActivity = async (id) => {
    try {
        await httpRequest.delete(`/activity/${id}`);
    } catch (error) {
        console.error(`Error deleting activity with id ${id}`, error);
        throw error;
    }
};
