<script setup lang="ts">
import { ref } from 'vue';
import Form from '../components/Form.vue';
import { useRouter } from 'vue-router';
import { authorStore } from '../store';
import type { Author } from '../types.ts'

const router = useRouter();

const author = ref({
    name: '',
});

const handleSubmit = async (data: Author) => {
    try {
        console.log('sending:', data);

        await authorStore.actions.create(data);

        router.push({ name: 'authors.overview' });
    } catch (error: any) {
        console.error('Create Author failed:', error.response?.data || error);
    }
};

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <RouterLink :to="{ name: 'authors.overview' }" class="btn back">
                    Back
                </RouterLink>
                <h2 class="dark my-3">Add new Author</h2>
                <Form :author="author" @submit="handleSubmit" />
            </div>
        </div>
    </div>
</template>