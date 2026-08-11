<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bookStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const route = useRoute();

const id = Number(route.params.id);

const book = bookStore.getters.getById(id);

onMounted(async () => {
    if (!book.value) {
        await bookStore.actions.getAll();
    }
});
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12">
                <ErrorMessage />
            </div>
            <div 
                v-if="book"
                class="col-12 table-bg p-5 border-radius"
            >
                <table>
                    <colgroup>
                        <col class="">
                        <col class="table-w-12">
                        <col class="table-w-12">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="table-title-xl" colspan="2">
                                {{ book.title }}
                            </th>
                            <th class="text-center">
                                <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }" class="btn edit">
                                    Edit
                                </RouterLink>    
                            </th>
                            <th class="text-center">
                                <button @click="bookStore.actions.delete(book.id)" class="btn delete">Delete</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="" colspan="3">
                                {{ book.summary }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>