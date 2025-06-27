import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import { environment } from "src/environments/environment";
import { AUTH_TOKEN_KEY } from "src/app-configs/app.config";

class AxiosClient {
  static instance: AxiosClient | null = null;
  private client: AxiosInstance;

  constructor(baseURL = environment.apiUrl) {
    this.client = axios.create({
      baseURL, // Use the baseURL from config.js
      headers: {
        "Content-Type": "application/json", // Default Content-Type
      },
    });

    // Request interceptor to attach dynamic headers (like auth token)
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response && error.response.status === 401) {
          // Handle token failure (unauthorized)
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem(AUTH_TOKEN_KEY);
          // Optionally redirect to login page
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  static getInstance(baseURL?: string): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient(baseURL);
    }
    return AxiosClient.instance;
  }

  // HTTP Methods (GET, POST, PUT, DELETE)
  get(url: string, config: AxiosRequestConfig = {}) {
    return this.client.get(url, { ...config });
  }

  post(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.client.post(url, data, { ...config });
  }

  put(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.client.put(url, data, { ...config });
  }

  delete(url: string, config: AxiosRequestConfig = {}) {
    return this.client.delete(url, { ...config });
  }
}

export default AxiosClient;
