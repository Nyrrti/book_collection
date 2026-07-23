export interface Book {
    id: number;
    title: string;
    summary: string;
    author_id: number;
}

export type CreateBook = Omit<Book, 'id'> & {
    author_id: number | null;
};

export type UpdateBook = Omit<Book, 'id'>;