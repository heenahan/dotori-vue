import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import LoginView from '@/components/LoginView.vue'
import GoogleLoginView from '@/components/GoogleLoginView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
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