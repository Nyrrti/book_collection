import axios from 'axios';
import { ref, computed } from 'vue';
import { Author } from './types';
import { getRequest, putRequest, postRequest, deleteRequest } from '../../services/http';

// state
const authors = ref<Author[]>([]);


//getters
export const getAllAuthors = computed(() => authors.value);
export const getAuthorById = (id: number) => computed(() => authors.value.find(author => author.id == id));


//actions
export const fetchAuthors = async () => {
    const {data} = await getRequest<Author[]>('/authors');
    if(!data) return
    authors.value = data;
}

export const createAuthor = async (newAuthor: Author) => {
    const {data} = await postRequest<Author[]>('/authors', newAuthor);
    if(!data) return
    authors.value = data;
};

export const updateAuthor = async (id: number, updatedAuthor: Author) => {
    const { data } = await putRequest<Author[]>(`/authors/${id}`, updatedAuthor);
    if (!data) return;
    authors.value = data;
};

// export const deleteAuthor = async (id: number) => {
//     await axios.delete(`/api/authors/${id}`);
//     authors.value = authors.value.filter(author => author.id !== id);
// };

export const deleteAuthor = async (id: number) => {
    try {
        await deleteRequest(`/authors/${id}`);
        authors.value = authors.value.filter(author => author.id !== id);
    } catch (error: any) {
        alert(error.response.data.message);
    }
};

