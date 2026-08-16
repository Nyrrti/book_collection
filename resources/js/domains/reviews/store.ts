import { storeModuleFactory } from '../../../js/services/store';
import type { Review, CreateReview, UpdateReview }from './types';

export const reviewStore = storeModuleFactory<Review, CreateReview, UpdateReview>('/reviews');
