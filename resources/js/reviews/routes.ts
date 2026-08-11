import Overview from './pages/Overview.vue';
import Create from './pages/Create.vue';
import Edit from './pages/Edit.vue';
import Show from './pages/Show.vue'

export const reviewRoutes =  [
    { path: '/reviews', component: Overview, name: 'reviews.overview' },
    { path: '/reviews/create', component: Create, name: 'reviews.create' },
    { path: '/reviews/:id/edit', component: Edit, name: 'reviews.edit'},
    {
    path: '/reviews/:id',
    component: Show,
    name: 'reviews.show'
    }
];