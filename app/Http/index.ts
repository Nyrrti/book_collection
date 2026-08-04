import { destroyErrors } from 'services/error';
import { setErrorBag, setMessage } from 'services/error';

http.interceptors.request.use(
    config => {
        destroyErrors(); // Delete old errors
        destroyMessage(); // Delete old messages
        return config;
    },
    error => Promise.reject(error)
);

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 422) {
            setErrorBag(error.response.data.errors); // Save in error bag
            setMessage(error.response.data.message); // Save general errors
        }
        return Promise.reject(error);
    }
);