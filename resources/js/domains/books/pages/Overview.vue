<script setup lang="ts">

import { onMounted } from 'vue';
import { getAllBooks, fetchBooks, deleteBook } from '../store';

onMounted(() => {
    fetchBooks();
});

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
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
                        <tr v-for="book in getAllBooks" :key="book.id">
                            <td class="border-bottom bold">
                                {{ capitalize(book.title) }}
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
                                <button @click="deleteBook(book.id)" class="btn delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>