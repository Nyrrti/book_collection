import axios from 'axios';

import {
    destroyErrors,
    destroyMessage,
    setErrorBag,
    setMessage
} from '../error'

/**
 * Axios instance used for all API requests.
 * This keeps the API settings in one place.
 */
const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Runs before every request is sent.
 * Clears old errors and messages so they do not stay visible.
 */
http.interceptors.request.use(
    config => {
        destroyErrors(); 
        destroyMessage(); 
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Runs when a response comes back from Laravel.
 * If Laravel returns a 422 error, the field errors and
 * general message are saved in the error service.
 */
http.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 422) {
            setErrorBag(error.response.data.errors); 
            setMessage(error.response.data.message); 
        }
        return Promise.reject(error);
    }
);

/**
 * Sends a GET request.
 * T is the type of data we expect to get back.
 *
 * @param endpoint API endpoint to request.
 */
export const getRequest = <T>(endpoint: string) => http.get<T>(endpoint);


/**
 * Sends a POST request.
 * Usually used to create new data.
 *
 * @param endpoint API endpoint to send the request to.
 * @param data Data that will be sent to Laravel.
 */
export const postRequest = <T>(endpoint: string, data: unknown) =>
    http.post<T>(endpoint, data);

/**
 * Sends a PUT request.
 * Usually used to update existing data.
 *
 * @param endpoint API endpoint to send the request to.
 * @param data Updated data that will be sent to Laravel.
 */
export const putRequest = <T>(endpoint: string, data: unknown) =>
    http.put<T>(endpoint, data);

/**
 * Sends a DELETE request.
 * Usually used to remove existing data.
 *
 * @param endpoint API endpoint to send the request to.
 */
export const deleteRequest = <T>(endpoint: string) =>
    http.delete<T>(endpoint);
