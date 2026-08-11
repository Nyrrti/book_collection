<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bookStore } from '../store';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const route = useRoute();

const id = Number(route.params.id);

const book = bookStore.getters.getById(id);

onMounted(async () => {
    if (!book.value) {
        await bookStore.actions.getAll();
    }
});
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 pt-3">
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
                        <button @click="bookStore.actions.delete(book.id)" class="btn delete">Delete</button> 
                    </div>
                    <div class="col-12 pt-3 pb-5 mt-2 border-top">
                        <h4 class="bold">
                            Summary:
                        </h4>
                        <p class="text">
                            {{ book.summary }}
                        </p>
                    </div>
                    <div class="col-12">
                        <h4 class="bold">
                            Reviews:
                        </h4> 
                    </div>
                    <div class="col-12" v-if="book.reviews.length">
                        <div class="review-block p-3"
                            v-for="review in book.reviews"
                            :key="review.id"
                        >
                            <div class="rating-block"> 
                                {{ review.rating }}/10
                            </div>
                            <div class="review-content">
                                <h4 class="bold">
                                {{ review.title }}
                                </h4>
                                <p class="text">
                                    {{ review.description }}
                                </p>
                            </div>
                            
                        </div>
                    </div>

                    <p v-else>
                        No reviews yet.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>