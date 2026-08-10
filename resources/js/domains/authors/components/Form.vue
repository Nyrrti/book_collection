<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { authorStore } from '../../authors/store';
import FormError from '../../../components/FormError.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';

// Fetch authors when component is mounted
onMounted(async () => {
  await authorStore.actions.getAll();
});

const props = defineProps({ author: Object });

const emit = defineEmits(['submit']);

const form = ref({ ...props.author });

const handleSubmit = () => emit('submit', form.value);
</script>

<template>
    <div class="grid-container-fluid">
        <div class="grid-container max-width">
            <div class="col-12">
                <ErrorMessage />
            </div>
                 <form @submit.prevent="handleSubmit" class="row table-bg" novalidate>
                    <div class="col-6 field me-3">
                         <label>Author Name:</label>
                        <input v-model="form.name" type="text" required />
                        <FormError name="name" />
                    </div>
                    <div class="col-12 d-flex justify-end">
                        <button type="submit" class="btn add">Add</button>
                    </div>
                </form> 
        </div>
    </div>
</template>