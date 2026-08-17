<script setup lang="ts">

import { onMounted } from 'vue';
import {ref} from 'vue';
import { authorStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const authors = authorStore.getters.all;

onMounted(async () => {
  await authorStore.actions.getAll();
});

/**
 * Stores the id of the author whose delete request failed.
 * Null means there is currently no failed author.
 */
const failedAuthorId = ref<number | null>(null);

/**
 * Tries to delete an author.
 *
 * If the delete fails, the author's id is saved so the
 * error message can be shown under the correct table row.
 *
 * @param authorId Id of the author that should be deleted.
 */
const deleteAuthor = async (authorId: number) => {
    try {
        failedAuthorId.value = null;

        await authorStore.actions.delete(authorId);
    } catch (error) {
        failedAuthorId.value = authorId;
    }
};

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
                        <th class="table-title">
                            Name:
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <template v-for="author in authors" :key="author.id">
                            <tr>
                                <td class="border-bottom">
                                    <h4 class="bold">
                                        {{ author.name }}
                                    </h4>
                                    
                                </td>
                                <td class="border-bottom text-center">
                                    <RouterLink :to="{ name: 'authors.edit', params: { id: author.id } }" class="btn edit">
                                        Edit
                                    </RouterLink>    
                                </td>
                                <td class="border-bottom text-center">
                                    <button @click="deleteAuthor(author.id)" class="btn delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="failedAuthorId === author.id">
                                <td colspan="3">
                                    <ErrorMessage />
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>