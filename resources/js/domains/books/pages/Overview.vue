<script setup lang="ts">

import { onMounted } from 'vue';
import { bookStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const books = bookStore.getters.all;

onMounted(async () => {
    await bookStore.actions.getAll();
});

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12">
                <ErrorMessage />
            </div>
            <div class="col-12 table-bg p-5 border-radius">
                <table>
                    <colgroup>
                        <col class="table-w-30">
                        <col class="">
                        <col class="table-w-12">
                        <col class="table-w-12">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="table-title-xl" colspan="2">Books</th>
                        </tr>
                        <tr>
                            <th class="table-title">Title</th>
                            <th class="table-title">Summary</th>
                            <th class="table-title text-center" colspan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in books" :key="book.id">
                            <td class="border-bottom bold">
                                {{ book.title }}
                            </td>
                            <td class="border-bottom x-small">
                                {{ book.summary }}
                            </td>
                            <td class="border-bottom text-center">
                                <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }" class="btn edit">
                                    Edit
                                </RouterLink>    
                            </td>
                            <td class="border-bottom text-center">
                                <button @click="bookStore.actions.delete(book.id)" class="btn delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>