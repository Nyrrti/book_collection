import Create from './pages/Create.vue';
import Edit from './pages/Edit.vue';


export const reviewRoutes =  [
    { 
        path: '/books/:bookId/reviews/create', 
        component: Create, 
        name: 'reviews.create' 
    },
    { 
        path: '/books/:bookId/reviews/:reviewId/edit', 
        component: Edit, 
        name: 'reviews.edit'
    },
];