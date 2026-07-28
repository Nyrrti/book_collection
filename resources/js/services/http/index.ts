import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getRequest = <T>(endpoint: string) => http.get<T>(endpoint);

export const postRequest = <T>(endpoint: string, data: unknown) =>
    http.post<T>(endpoint, data);

export const putRequest = <T>(endpoint: string, data: unknown) =>
    http.put<T>(endpoint, data);

export const deleteRequest = <T>(endpoint: string) =>
    http.delete<T>(endpoint);
