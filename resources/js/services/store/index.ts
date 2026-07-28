import { ref, computed } from 'vue';
import { getRequest, putRequest, postRequest, deleteRequest } from '../http/index';

type Entity = {
    id: number;
};

export const storeModuleFactory = <
    T extends Entity,
    CreateT,
    UpdateT
>(moduleName: string) => {
    const state = ref<Record<number, Readonly<T>>>({});

    const getters = {
        all: computed(() => Object.values(state.value)),

        getById: (id: number) =>
            computed(() => state.value[id]),
    };

    const setters = {
        setAll: (items: T[]) => {
            for (const item of items) {
                state.value[item.id] = Object.freeze(item);
            }
        },

        deleteByItem: (item: Entity) => {
            delete state.value[item.id];
        }
    };

    const actions = {
        getAll: async () => {
            const { data } = await getRequest<T[]>(moduleName);

            if (!data) return;

            setters.setAll(data);
        },

        create: async (item: CreateT) => {
            const { data } = await postRequest<T[]>(moduleName, item);
            if (!data) return;

            setters.setAll(data);
        },

        update: async (id: number, item: UpdateT) => {
            const { data } = await putRequest<T[]>(
                `${moduleName}/${id}`,
                item
            );

            if (!data) return;

            setters.setAll(data);
        },

        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteByItem({ id });
        },
    };

    return { getters, setters, actions };
};
