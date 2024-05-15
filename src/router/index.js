import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/LoginView.vue'
import GoogleLoginView from '@/components/GoogleLoginView.vue'
import SearchBookView from '@/components/SearchBookView.vue'

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
        }
    ]
})

export default router