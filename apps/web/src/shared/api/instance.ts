import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

// export const AXIOS_INSTANCE = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
// });

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://localhost:3000',
});

// export const instance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
//   const response: AxiosResponse<T> = await AXIOS_INSTANCE({
//     ...config,
//     ...options,
//   });

export const instance = async <T>(url: string, config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await AXIOS_INSTANCE({
    url,
    ...config,
  });

  return response.data;
};
