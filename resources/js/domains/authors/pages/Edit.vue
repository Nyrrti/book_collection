<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { fetchAuthors, getAuthorById, updateAuthor } from '../store';
import type { Author } from '../types.ts'

const route = useRoute();
const router = useRouter();

fetchAuthors();

const id = Number(route.params.id);
const author = getAuthorById(id);

const handleSubmit = async (data: Author) => {
    await updateAuthor(Number(id), data);
    router.push({ name: 'authors.overview' });
};

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <h2>
                    Edit Author
                </h2>
                <Form v-if="author" :author="author" @submit="handleSubmit" />
            </div>
        </div>
    </div>


</template>