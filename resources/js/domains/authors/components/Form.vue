<script setup lang="ts">
import { ref } from 'vue';
import { fetchAuthors, getAllAuthors } from '../../authors/store';

// Fetch authors when component is mounted
fetchAuthors();

const props = defineProps({ author: Object });

const emit = defineEmits(['submit']);

const form = ref({ ...props.author });

const handleSubmit = () => emit('submit', form.value);
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
                 <form @submit.prevent="handleSubmit" class="row table-bg">
                    <div class="col-6 field me-3">
                         <label>Author Name:</label>
                        <input v-model="form.name" type="text" required />
                    </div>
                    <div class="col-12 d-flex justify-end">
                        <button type="submit" class="btn add">Add</button>
                    </div>
                </form> 
        </div>
    </div>
</template>