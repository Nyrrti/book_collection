<script setup lang="ts">
import { ref } from 'vue';
import Form from '../components/Form.vue';
import { useRouter } from 'vue-router';
import { bookStore } from '../store';
import type { CreateBook } from '../types.ts'

const router = useRouter();

const newBook = ref<CreateBook>({
    title: '',
    summary: '',
    author_id: 0
});

// const handleSubmit = async (data: CreateBook) => {
//     await createBook(data);
//     router.push({name: 'books.overview'});
// };

const handleSubmit = async (data: CreateBook) => {
    try {
        console.log('sending:', data);

        await bookStore.actions.create(data);

        router.push({ name: 'books.overview' });
    } catch (error: any) {
        console.error('Create book failed:', error.response?.data || error);
    }
};

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <h2 class="dark">Add new book</h2>
                <Form :book="newBook" @submit="handleSubmit" />
            </div>
        </div>
    </div>
</template>