<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { bookStore } from '../../books/store';
    import { reviewStore } from '../../reviews/store';

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
    <div class="col-12">
        <h4 class="bold">
            Reviews:
        </h4> 
    </div>
    <div class="review-block p-1 mb-1"
        v-for="review in book?.reviews ?? []"
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
        <div class="review-actions">
            <RouterLink
                :to="{ 
                    name: 'reviews.edit', 
                    params: { 
                        bookId: book.id,
                        reviewId: review.id
                        } 
                }"
                class="icon-btn edit-btn"
                title="Edit review"
                aria-label="Edit Review"
            >
                <svg viewBox="0 0 24 24">
                    <path
                        d="M12 20h9"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                    />
                    <path
                        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                    />
            </svg>
            </RouterLink>
        
        <button 
            @click="reviewStore.actions.delete(review.id)" 
            class="icon-btn delete-btn" 
            title="Delete review"
        >
            <svg viewBox="0 0 24 24">
                <path
                    d="M3 6h18"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <path
                    d="M8 6V4h8v2"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                />
                <path
                    d="M6 6l1 14h10l1-14"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                />
            </svg>
        </button>
    </div>
           
    </div>

</template>

<style>

.review-block {
    border: 1px solid var(--color-light-grey);
    display: flex;
    align-items: flex-start;
    align-items: center;
    gap:2rem;
}

.rating-block {
    flex: 0 0 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-purple);
    color: var(--table-title);
}

.review-content {
    flex: 1;
}

.review-actions {
    display: flex;
    gap: 0.5rem;
}

.icon-btn {
    width: 2.5rem;
    height: 2.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 0.1rem;
    cursor: pointer;

    transition:
        background-color 0.2s,
        color 0.2s;
}

.icon-btn svg {
    width: 1.5rem;
    height: 1.5rem;
}

.edit-btn {
    color: var(--color-light-blue);
}

.edit-btn:hover {
    background-color: var(--color-purple);
    color: white;
}

.delete-btn {
    color: var(--color-red);
}

.delete-btn:hover {
    background-color: var(--color-red);
    color: white;
}
</style>