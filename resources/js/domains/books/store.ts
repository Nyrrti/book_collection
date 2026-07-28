import axios from 'axios';
import { ref, computed } from 'vue';
import type { Book, UpdateBook, CreateBook } from '../books/types';
import { getRequest, putRequest, postRequest, deleteRequest } from '../../services/http';


// state
const books = ref<Book[]>([]);

//getters
export const getAllBooks = computed(() => books.value);
export const getBookById = (id: number) => computed(() => books.value.find(book => book.id == id));

//actions
export const fetchBooks = async () => {
    const {data} = await getRequest<Book[]>('/books');
    if(!data) return
    books.value = data;
}


export const updateBook = async (id: number, updatedBook: UpdateBook) => {
    const { data } = await putRequest<Book[]>(`/books/${id}`, updatedBook);

    if (!data) return;

    books.value = data;
};

export const createBook = async (newBook: CreateBook) => {
    const { data } = await postRequest<Book[]>('/books', newBook);

    if (!data) return;

    books.value = data;
};


export const deleteBook = async (id: number) => {
    await deleteRequest(`/books/${id}`);
    books.value = books.value.filter(book => book.id !== id);
};

