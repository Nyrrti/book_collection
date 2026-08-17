<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import FormError from '../../../components/FormError.vue';
    import ErrorMessage from '../../../components/ErrorMessage.vue';
    import { bookStore } from '../../books/store.js';

    const books = bookStore.getters.all;

    onMounted(async () => {
        await bookStore.actions.getAll();
    });

    const props = defineProps({ review: Object });
    const emit = defineEmits(['submit']);
    const form = ref({ ...props.review });

    const handleSubmit = () => emit('submit', form.value);
    
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 py-3">
                <ErrorMessage />
            </div>
                <form @submit.prevent="handleSubmit" class="row table-bg" novalidate>
                    <div class="col-6 field me-3">
                        <label>Title:</label>
                        <input v-model="form.title" type="text" required />
                        <FormError name="title" />
                    </div>
                    <div class="col-6 field">
                        <label>Book:</label>
                        <select v-model="form.book_id" required>
                        <option v-for="book in books" :key="book.id" :value="book.id">
                            {{ book.title }}
                        </option>
                    </select>
                    <FormError name="book_id" />
                    </div>
                    <div class="col-4 field">
                        <label>Rating:</label>
                        <input v-model="form.rating" type="number" required />
                    <FormError name="rating" />
                    </div>
                    <div class="col-12 field">
                        <label>Description:</label>
                        <textarea v-model="form.description" required></textarea>
                        <FormError name="description" />
                    </div>
                    <div class="col-12 d-flex justify-end">
                        <button type="submit" class="btn add">Add</button>
                    </div>
                </form>  
        </div>
    </div>
</template>