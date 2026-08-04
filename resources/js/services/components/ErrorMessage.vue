<script setup lang="ts">
import { getMessage } from '../error';
</script>

<template>
    <div v-if="getMessage">
        {{ getMessage }}
    </div>
</template>

