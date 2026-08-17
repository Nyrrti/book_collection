<script setup lang="ts">

import { onMounted } from 'vue';
import { bookStore } from '../store';
import BookTable from '../components/BookTable.vue';

const books = bookStore.getters.all;

onMounted(async () => {
    await bookStore.actions.getAll();
});

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <BookTable :books="books" />
        </div>
    </div>
</template>