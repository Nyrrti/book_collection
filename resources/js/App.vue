<template>
    <nav>
        <router-link :to="{name: 'books.overview'}">Book Overview</router-link> |
        <router-link :to="{name: 'books.create'}">New Book</router-link>
    </nav>
    <router-view></router-view>

    <div class="grid-container-fluid">
        <div class="grid-container">
            <div class="col-12">
                <h1>
                    Hello There! From App.vue
                </h1>
            </div>
        </div>
    </div>
</template>