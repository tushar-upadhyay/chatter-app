import api from "./axios-service";

export class APIService {

    request = async (url, method = 'GET', payload) => {
        let response;
        try {
            api.interceptors.request.use((config) => {
                config.headers.Authorization = localStorage.getItem('authToken');
                return config;
            })
            if (method === 'POST') {
                response = await api.post(url, payload);
            }
            else if (method === 'GET') {
                response = await api.get(url);
            }
            else if (method === 'DELETE') {
                response = await api.delete(url);
            }
            return ({ response: response.data, error: false });
        }
        catch (err) {
            return ({
                error: err,
                response
            });
        }
    }

    getAllMessages = () => {
        return this.request('/');
    }

    postMessage = (message) => {
        return this.request('/', 'POST', message);
    }

    deleteMessage = (id) => {
        return this.request(`/${id}/`, 'DELETE');
    }


}

export const apiService = new APIService();