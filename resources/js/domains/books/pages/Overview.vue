<script setup lang="ts">

import { onMounted } from 'vue';
import { getAllBooks, fetchBooks } from '../store';

onMounted(() => {
    fetchBooks();
});

</script>

<template>

    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12">
                <h1 class="py-3">
                    Hello There!
                </h1>
                <table class="table-bg">
                    <colgroup>
                        <col class="table-w-40">
                        <col class="">
                    </colgroup>
                    <tr>
                        <th class="table-title-xl" colspan="2">Books</th>
                    </tr>
                    <tr>
                        <th class="table-title">Title</th>
                        <th class="table-title">Summary</th>
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