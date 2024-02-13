import axios from 'axios';
//import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:5000';

            /** API CALLS */
export const register = async (credentials) => {
    try {
        const { data: { message } } = await axios.post('/api/v1/user/register', credentials);

        return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({ error });
    }
}
