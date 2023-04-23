import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// data is raw body type json
export const get = async (path, data) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export default httpRequest;
