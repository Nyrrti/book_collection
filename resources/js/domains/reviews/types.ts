
export interface Review {
    id: number;
    book_id: number;
    title: string;
    rating: number;
    description: string;
}

export type CreateReview = Omit<Review, 'id' | 'rating'> & {
    rating: number | null;
};  

export type UpdateReview = Omit<Review, 'id'>;