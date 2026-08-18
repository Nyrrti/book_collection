<script setup lang="ts">
import { ref } from 'vue';
import { authorStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import type { Author } from '../types';

defineProps<{
    authors: Author[];
}>();

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
    <table class="table-bg">
        <colgroup>
            <col>
            <col class="table-w-12">
            <col class="table-w-12">
        </colgroup>

        <thead>
            <tr>
                <th class="table-title-xl">
                    Authors
                </th>
            </tr>

            <tr>
                <th class="table-title">
                    Name:
                </th>
            </tr>
        </thead>

        <tbody>
            <template
                v-for="author in authors"
                :key="author.id"
            >
                <tr>
                    <td class="border-bottom">
                        <h4 class="bold">
                            {{ author.name }}
                        </h4>
                        <ErrorMessage
                            v-if="failedAuthorId === author.id"
                        />
                    </td>

                    <td class="border-bottom text-center">
                        <RouterLink
                            :to="{
                                name: 'authors.edit',
                                params: { id: author.id }
                            }"
                            class="btn edit"
                        >
                            Edit
                        </RouterLink>
                    </td>

                    <td class="border-bottom text-center">
                        <button
                            @click="deleteAuthor(author.id)"
                            class="btn delete"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>