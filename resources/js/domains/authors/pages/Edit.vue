<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import { onMounted } from 'vue';
import { authorStore } from '../store';
import type { Author } from '../types.ts'

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
const author = authorStore.getters.getById(id);

const handleSubmit = async (data: Author) => {
    await authorStore.actions.update(id, data);
    router.push({ name: 'authors.overview' });
};

onMounted(async () => {
    if (!author.value) {
        await authorStore.actions.getAll();
    }
});

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <RouterLink :to="{ name: 'authors.overview' }" class="btn back">
                    Back
                </RouterLink>
                <h2 class="my-3">
                    Edit Author
                </h2>
                <Form v-if="author" :author="author" @submit="handleSubmit" />
            </div>
        </div>
    </div>


</template>