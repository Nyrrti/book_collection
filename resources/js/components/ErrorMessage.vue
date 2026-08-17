<script setup lang="ts">
import { getMessage, destroyMessage, destroyErrors } from '../services/error';

function clearError() {
    destroyMessage();
    destroyErrors();
}

</script>

<template>
    <div v-if="getMessage" class="error-message">
        <span>
            {{ getMessage }}
        </span> 
        <button
            type="button"
            class="error-close"
            @click="clearError"
            aria-label="Close error message"
        >
            ×
        </button>
    </div>
</template>

<style>

.error-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    color: var(--color-red);
    background-color: #fdeaea;
    border: 1px solid var(--color-red);
    padding: 0.75rem 1rem;
    margin-bottom: 16px;
    border-radius: 4px;
}

.error-close {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    color: inherit;
}

</style>