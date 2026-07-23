<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { fetchBooks, getBookById, updateBook } from '../store';
import type { UpdateBook } from '../types.ts'

const route = useRoute();
const router = useRouter();

fetchBooks();

const id = Number(route.params.id);
const book = getBookById(id);

const handleSubmit = async (data: UpdateBook) => {
    await updateBook(Number(id), data);
    router.push({ name: 'books.overview' });
};

console.log(book.value);

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <h2>
                    Edit Book
                </h2>
                <Form v-if="book" :book="book" @submit="handleSubmit" />
            </div>
        </div>
    </div>


</template>