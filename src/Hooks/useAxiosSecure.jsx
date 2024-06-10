import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-orcin-gamma.vercel.app'
})
const useAxiosSecure = () => {
   
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request stop by interceptor', token);
        config.headers.authorization = `Bearer ${token}`;
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptors error', status);
       
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;