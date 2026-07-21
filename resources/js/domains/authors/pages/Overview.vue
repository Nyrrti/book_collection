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
            <div class="col-12">
                <h1 class="py-3">
                    Hello There!
                </h1>
                <table class="table-bg">
                    <tr>
                        <th class="table-title-xl" colspan="2">Authors</th>
                    </tr>
                    <tr>
                        <th class="table-title">Name:</th>
                        
                    </tr>
                    <tr v-for="author in getAllAuthors" :key="author.id">
                        <td>
                            {{ author.name }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>