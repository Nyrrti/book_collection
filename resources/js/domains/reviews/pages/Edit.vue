<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted } from 'vue';
    import { reviewStore } from '../store';
    import { bookStore } from '../../books/store';
    import Form from '../components/Form.vue';
    import type { UpdateReview } from '../types';

    const route = useRoute();
    const router = useRouter();
    const bookId = Number(route.params.bookId);
    const reviewId = Number(route.params.reviewId);

    const review = reviewStore.getters.getById(reviewId);

    const handleSubmit = async (data: UpdateReview) => {
        await reviewStore.actions.update(reviewId, data);

        await bookStore.actions.getAll();

        router.push({
            name: 'books.show',
            params: { id: bookId }
        });
    };

    onMounted(async () => {
        if (!review.value) {
            await reviewStore.actions.getAll();
        }
    });

</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12 table-bg p-5">
                <RouterLink
                    :to="{
                        name: 'books.show',
                        params: { id: bookId }
                    }"
                    class="btn back"
                >
                    Back
                </RouterLink>
                <h2 class="border-bottom my-3">
                    Edit Review
                </h2>
                <Form v-if="review" :review="review" @submit="handleSubmit" />
            </div>
        </div>
    </div>
</template>