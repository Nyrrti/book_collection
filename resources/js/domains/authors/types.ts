export interface Author {
    id: number;
    name: string;
}

export type CreateAuthor = Omit<Author, 'id'>;

export type UpdateAuthor = Omit<Author, 'id'>;