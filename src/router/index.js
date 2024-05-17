import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/LoginView.vue'
import GoogleLoginView from '@/components/GoogleLoginView.vue'
import SearchBookView from '@/components/SearchBookView.vue'
import BookDetailView from '@/components/BookDetailView.vue'
import MemberBookDetailView from '@/components/member_book/MemberBookDetailView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/search',
            name: 'search',
            component: SearchBookView
        },
        { 
            path: '/login', 
            children: [
                { path: '', name: 'login', component: LoginView },
                { path: 'google', name: 'googleLogin', component: GoogleLoginView }
            ]
        },
        {
            path: '/book',
            children: [
                { path: ':isbn', name: 'bookDetail', component: BookDetailView }
            ]
        },
        {
            path: '/member-book',
            children: [
                { path: ':memberBookId', name: 'memberBookDetail', component: MemberBookDetailView }
            ]
        }
    ]
})

export default router