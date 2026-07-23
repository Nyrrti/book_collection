<script setup lang="ts">
import { ref } from 'vue';
import Form from '../components/Form.vue';
import { useRouter } from 'vue-router';
import { createBook } from '../store'
import type { CreateBook } from '../types.ts'

const router = useRouter();

const book = ref({
    title: '',
    summary: '',
    author_id: null
});

// const handleSubmit = async (data: CreateBook) => {
//     await createBook(data);
//     router.push({name: 'books.overview'});
// };

const handleSubmit = async (data: CreateBook) => {
    try {
        console.log('sending:', data);

        await createBook(data);

        router.push({ name: 'books.overview' });
    } catch (error: any) {
        console.error('Create book failed:', error.response?.data || error);
    }
};

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5 border-radius">
                <h2 class="dark">Add new book</h2>
                <Form :book="book" @submit="handleSubmit" />
            </div>
        </div>
    </div>
</template>