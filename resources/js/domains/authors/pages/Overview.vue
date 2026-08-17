<script setup lang="ts">
import { onMounted } from 'vue';
import { authorStore } from '../store';
import AuthorTable from '../components/AuthorTable.vue';

const authors = authorStore.getters.all;

onMounted(async () => {
    await authorStore.actions.getAll();
});
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">

                <AuthorTable :authors="authors" />

            </div>
        </div>
    </div>
</template>