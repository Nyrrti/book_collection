import { storeModuleFactory } from '../../../js/services/store';
import type { Book, CreateBook, UpdateBook } from './types';

export const bookStore = storeModuleFactory<Book, CreateBook, UpdateBook>('/books');
