<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { bookStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import ReviewBlock from '../../reviews/components/ReviewBlock.vue';

const route = useRoute();
const router = useRouter();

const bookId = Number(route.params.id);
const book = bookStore.getters.getById(bookId);

onMounted(async () => {
    if (!book.value) {
        await bookStore.actions.getAll();
    }
});

async function deleteBook(bookId: number) {
    await bookStore.actions.delete(bookId);

    router.push({
        name: 'books.overview'
    });
}

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12">
                <ErrorMessage />
            </div>
            <div 
                v-if="book"
                class="col-12 table-bg p-5"
            >
                <div class="row">
                    <div class="col-12 pb-4">
                        <RouterLink :to="{ name: 'books.overview' }" class="btn back">
                            Back
                        </RouterLink>
                    </div>
                    <div class="col-8">
                        <h2 class="color">
                            {{ book.title }}
                        </h2>
                        <h4 class="">
                            <span class="bold">
                                Author:
                            </span> 
                            {{ book.author?.name }}
                        </h4>
                    </div>
                    <div class="col-4 d-flex items-center justify-end gap-4">
                        <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }" class="btn edit">
                            Edit
                        </RouterLink> 
                        <button @click="deleteBook(book.id)" class="btn delete">Delete</button> 
                    </div>
                    <div class="col-12 pt-4 pb-5 mt-3 border-top">
                        <h4 class="bold">
                            Summary:
                        </h4>
                        <p class="text">
                            {{ book.summary }}
                        </p>
                    </div>
                    <!-- Reviews -->
                    <div class="col-12" v-if="book.reviews.length">
                       <ReviewBlock />
                    </div>
                    <p v-else class="col-12">
                        No reviews yet.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>