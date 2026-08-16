import Create from './pages/Create.vue';
import Edit from './pages/Edit.vue';


export const reviewRoutes =  [
    { 
        path: '/books/:id/reviews/create', 
        component: Create, 
        name: 'reviews.create' 
    },
    { 
        path: '/books/:id/reviews/:id/edit', 
        component: Edit, 
        name: 'reviews.edit'
    },
];