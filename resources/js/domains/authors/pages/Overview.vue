<script setup lang="ts">

import { onMounted } from 'vue';
import { getAllAuthors, fetchAuthors } from '../store';

onMounted(() => {
    fetchAuthors();
});

</script>

<template>

    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <table class="table-bg">
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>