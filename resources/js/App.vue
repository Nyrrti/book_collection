<template>
    <nav class="nav-bar d-flex items-center justify-center">
        <ul>
            <li class="nav">
                <router-link :to="{name: 'books.overview'}">
                    Book Overview
                </router-link> 
            </li>
            <li class="nav">
                 <router-link :to="{name: 'books.create'}">
                    New Book
                </router-link>
            </li>
        </ul>
        
       
    </nav>
    <router-view></router-view>
</template>