<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { authorStore } from '../../authors/store';
import FormError from '../../../components/FormError.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import type { CreateBook } from '../types';

// Fetch authors when component is mounted
onMounted(async () => {
  await authorStore.actions.getAll();
});

const authors = authorStore.getters.all;

const props = defineProps<{
    book: CreateBook
}>();

const emit = defineEmits(['submit']);

const form = ref({ ...props.book });

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
                        <label>Author:</label>
                        <select v-model="form.author_id" required>
                        <option v-for="author in authors" :key="author.id" :value="author.id">
                            {{ author.name }}
                        </option>
                    </select>
                    <FormError name="author_id" />
                    </div>
                    <div class="col-12 field">
                        <label>Summary:</label>
                        <textarea v-model="form.summary" required></textarea>
                        <FormError name="summary" />
                    </div>
                    <div class="col-12 d-flex justify-end">
                        <button type="submit" class="btn add">Add</button>
                    </div>
                </form>  
        </div>
    </div>
</template>