
export interface Review {
    id: number;
    book_id: number;
    title: string;
    rating: number;
    description: string;
}

export type CreateReview = Omit<Review, 'id'> & {
};

export type UpdateReview = Omit<Review, 'id'>;