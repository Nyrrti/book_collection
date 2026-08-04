import { storeModuleFactory } from '../../../js/services/store';
import type { Author, CreateAuthor, UpdateAuthor } from './types';

export const authorStore = storeModuleFactory<Author, CreateAuthor, UpdateAuthor>('/authors');
