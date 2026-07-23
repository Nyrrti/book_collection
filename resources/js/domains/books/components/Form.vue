<script setup lang="ts">
import { ref } from 'vue';
import { fetchAuthors, getAllAuthors } from '../../authors/store';

// Fetch authors when component is mounted
fetchAuthors();

const props = defineProps({ book: Object });

const emit = defineEmits(['submit']);

const form = ref({ ...props.book });

const handleSubmit = () => emit('submit', form.value);
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
                 <form @submit.prevent="handleSubmit" class="row table-bg">
                    <div class="col-6 field me-3">
                         <label>Title:</label>
                        <input v-model="form.title" type="text" required />
                    </div>
                    <div class="col-6 field">
                        <label>Author:</label>
                        <select v-model="form.author_id" required>
                        <option v-for="author in getAllAuthors" :key="author.id" :value="author.id">
                            {{ author.name }}
                        </option>
                    </select>
                    </div>
                    <div class="col-12 field">
                        <label>Summary:</label>
                        <textarea v-model="form.summary" required></textarea>
                    </div>
                    <div class="col-12 d-flex justify-end">
                        <button type="submit" class="btn add">Add</button>
                    </div>
                </form>
            
        </div>
    </div>
</template>