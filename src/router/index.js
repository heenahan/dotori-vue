import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/login/LoginView.vue'
import GoogleLoginView from '@/components/login/GoogleLoginView.vue'
import SearchBookView from '@/components/book/SearchBookView.vue'
import BookDetailView from '@/components/book/BookDetailView.vue'
import MemberBookDetailView from '@/components/member_book/MemberBookDetailView.vue'
import MemberBookUpdateView from '@/components/member_book/MemberBookUpdateView.vue'
import StatisticsYearView from '@/components/statistics/StatisticsYearView.vue'
import MemberBookView from '@/components/member_book/MemberBookView.vue'


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
                { path: '', name: 'memberBook', component: MemberBookView },
                { path: ':memberBookId', name: 'memberBookDetail', component: MemberBookDetailView },
                { path: ':memberBookId/update', name: 'memberBookUpdate', component: MemberBookUpdateView }
            ]
        },
        {
            path: '/statistics',
            children: [
                { path: '', name: 'statisticsYear', component: StatisticsYearView }
            ]
        }
    ]
})

export default router