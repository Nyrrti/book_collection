<script setup lang="ts">

import { onMounted } from 'vue';
import { getAllAuthors, fetchAuthors, deleteAuthor } from '../store';

onMounted(() => {
    fetchAuthors();
});

</script>

<template>

    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <table class="table-bg">
                    <colgroup>
                        <col class="">
                        <col class="table-w-12">
                        <col class="table-w-12">
                    </colgroup>
                    <thead>
                    <tr>
                        <th class="table-title-xl">Authors</th>
                    </tr>
                    <tr>
                        <th class="table-title">Name:</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="author in getAllAuthors" :key="author.id">
                            <td class="border-bottom">
                                {{ author.name }}
                            </td>
                            <td class="border-bottom text-center">
                                <RouterLink :to="{ name: 'authors.edit', params: { id: author.id } }" class="btn edit">
                                    Edit
                                </RouterLink>    
                            </td>
                            <td class="border-bottom text-center">
                                <button @click="deleteAuthor(author.id)" class="btn delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>