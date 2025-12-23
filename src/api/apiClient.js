import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({

  baseURL:import.meta.env.VITE_API_BASE_URL,
  

  headers:{
      "Content-Type": "application/json",
      Accept: 'application/json',
  },
timeout: 240000, // 10 seconds timeout
withCredentials: true, // Include cookies in requests
  
});

apiClient.interceptors.request.use(

  async (config) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
      // Only fetch CSRF token for non-safe methods
   
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 explicitly: clear token and redirect to login
    if (error.response && error.response.status === 401) {
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // Generic retry strategy for transient network/server failures (cold starts)
    const config = error.config || {};

    // Only retry idempotent-ish requests or when there was a network error / server error
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500 && error.response.status < 600;

    const maxRetries = 3;

    config.__retryCount = config.__retryCount || 0;

    if ((isNetworkError || isServerError) && config.__retryCount < maxRetries) {
      config.__retryCount += 1;

      // exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, config.__retryCount - 1) * 1000;
      // small log for debugging during development
      // eslint-disable-next-line no-console
      console.warn(`apiClient retry #${config.__retryCount} after ${delay}ms`);

      await new Promise((res) => setTimeout(res, delay));

      // Retry the original request
      return apiClient(config);
    }

    return Promise.reject(error);
  }
);


export default apiClient;