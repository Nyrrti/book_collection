<script setup lang="ts">

import { onMounted } from 'vue';
import { getAllBooks, fetchBooks } from '../store';

onMounted(() => {
    fetchBooks();
});

</script>

<template>

    <div class="grid-container-fluid">
        <div class="grid-container">
            <div class="col-12">
                <h1 class="py-3">
                    Hello There!
                </h1>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Summary</th>
                    </tr>
                    <tr v-for="book in getAllBooks" :key="book.id">
                        <td>
                            {{ book.title }}
                        </td>
                        <td>
                            {{ book.summary }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>