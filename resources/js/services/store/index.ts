import { ref, computed } from 'vue';
import { getRequest, putRequest, postRequest, deleteRequest } from '../http/index';


/**
 * Basic type that every stored item must have.
 * T must extend this type, so every T must contain an id.
 */
type Entity = {
    id: number;
};


/**
 * Creates a reusable store for a module, such as books or authors.
 *
 * T is the full type stored in the store.
 * For example:
 *
 * storeModuleFactory<Book, CreateBook, UpdateBook>('books')
 *
 * In that case:
 * T = Book
 * CreateT = CreateBook
 * UpdateT = UpdateBook
 *
 * "T extends Entity" means T must at least contain:
 * { id: number }
 *
 * This is needed because the store uses item.id to save and find items.
 *
 * @template T Full type of an item returned by the API.
 * @template CreateT Type of data used when creating an item.
 * @template UpdateT Type of data used when updating an item.
 * @param moduleName Name of the API module, for example "books".
 */
export const storeModuleFactory = <
    T extends Entity,
    CreateT,
    UpdateT
>(moduleName: string) => {

     /**
     * Stores all items by their id.
     *
     * If T is Book, this stores Book objects.
     *
     * Example:
     * {
     *     1: Book,
     *     2: Book
     * }
     */
    const state = ref<Record<number, Readonly<T>>>({});

    /**
     * Functions used to read data from the store.
     */
    const getters = {
        // Return all stored T items as an array.
        // If T is Book, this returns Book[].
        all: computed(() => Object.values(state.value)),

        // Find one T item by its id.
        // If T is Book, this returns a Book.
        getById: (id: number) =>
            computed(() => state.value[id]),
    };

     /**
     * Functions used to change the store data.
     */
    const setters = {

         /**
         * Save multiple T items in the store.
         *
         * If T is Book, items must be Book[].
         */
        setAll: (items: T[]) => {
            for (const item of items) {
                state.value[item.id] = Object.freeze(item);
            }
        },

        /**
         * Remove an item from the store by its id.
         */
        deleteByItem: (item: Entity) => {
            delete state.value[item.id];
        }
    };

     /**
     * Functions that make API requests.
     */
    const actions = {

        /**
         * Get all items from the API.
         *
         * T[] means we expect an array of the full item type.
         *
         * If T is Book:
         * getRequest<T[]> becomes getRequest<Book[]>.
         */
        getAll: async () => {
            const { data } = await getRequest<T[]>(moduleName);

            if (!data) return;

            setters.setAll(data);
        },

         /**
         * Create a new item.
         *
         * CreateT is the type of data that may be sent when creating.
         * It can be different from T because a new item may not have
         * an id yet.
         *
         * If T is Book:
         * postRequest<T[]> expects Book[] back from the API.
         */
        create: async (item: CreateT) => {
            const { data } = await postRequest<T[]>(moduleName, item);
            if (!data) return;

            setters.setAll(data);
        },

         /**
         * Update an existing item.
         *
         * UpdateT is the type of data allowed for an update.
         *
         * T[] is still used for the response because the API
         * returns the full stored items.
         */
        update: async (id: number, item: UpdateT) => {
            const { data } = await putRequest<T[]>(
                `${moduleName}/${id}`,
                item
            );

            if (!data) return;

            setters.setAll(data);
        },

         /**
         * Delete an item from the API.
         *
         * When the request succeeds, the item is also removed
         * from the local store.
         */
        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteByItem({ id });
        },
    };

    return { getters, setters, actions };
};
