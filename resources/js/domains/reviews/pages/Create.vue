<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted } from 'vue';
    import { reviewStore } from '../store';
    import { bookStore } from '../../books/store';
    import Form from '../components/Form.vue';
    import type { CreateReview } from '../types';

    const route = useRoute();
    const router = useRouter();
    const bookId = Number(route.params.bookId);

    const newReview = ref<CreateReview>({
        title: '',
        book_id: bookId,
        rating: 0 ,
        description: '',
    });

    const handleSubmit = async (data: CreateReview) => {
        try {
            console.log('sending:', data);

            await reviewStore.actions.create(data);
            await bookStore.actions.getAll();

            router.push({ 
                name: 'books.show',
                params: { id: bookId } 
            });
        } catch (error: any) {
            console.error('Create review failed:', error.response?.data || error);
        }
    };

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
                <h2 class="dark my-3">Add new review</h2>
                <Form :review="newReview" @submit="handleSubmit" />
            </div>
        </div>
    </div>
</template>