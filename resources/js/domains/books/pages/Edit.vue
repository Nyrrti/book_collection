<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { onMounted } from 'vue';
import { bookStore } from '../store';
import type { UpdateBook } from '../types';

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);

const book = bookStore.getters.getById(id);

const handleSubmit = async (data: UpdateBook) => {
    await bookStore.actions.update(id, data);
    router.push({ name: 'books.overview' });
};

onMounted(async () => {
    if (!book.value) {
        await bookStore.actions.getAll();
    }
});

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <h2>
                    Edit Book
                </h2>

                <Form 
                    v-if="book" 
                    :book="book" 
                    @submit="handleSubmit" 
                />
            </div>
        </div>
    </div>
</template>
