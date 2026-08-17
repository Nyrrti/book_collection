export interface Author {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    book_id: number;
    title: string;
    rating: number;
    description: string;
}

export interface Book {
    id: number;
    title: string;
    summary: string;
    author_id: number;
    author: Author | null;
    reviews: Review[];
}

export type CreateBook = Omit<Book, 'id' | 'author' | 'author_id' | 'reviews'> & {
    author_id: number | null;
};

export type UpdateBook = Omit<Book, 'id' | 'author' | 'reviews'>;