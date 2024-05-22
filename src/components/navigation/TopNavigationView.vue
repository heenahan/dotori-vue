<template>
    <nav class="top-nav">
        <ul class="top-nav-content">
            <li class="top-nav-button-back"><img src="@/assets/back_img.png" alt="back" class="back_img" @click="handleBack"/></li>
            <li class="top-nav-button-save" @click="$emit('clickButton')"><span>{{ message }}</span></li>
        </ul>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    props: ['message'],
    data() {
        return {
            router: useRouter()
        }
    },
    methods: {
        handleBack() {
            this.router.back();
        }
    }
}
</script>

<style scoped>
.top-nav {
    position: fixed;
    top: 0; left: 0;
    width: 412px;
    padding: 0;
    background-color: white;
}

.top-nav-content {
    list-style: none;
    padding: 0;
    margin: 0;
}

.top-nav-content li {
    display: inline-block;
}

.top-nav-button-back {
    padding: 8px;
    width: 20px; 
    height: 20px;
}

.top-nav-button-save {
    float: right;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 8px 8px 8px;
    color: #F28379;
    font-family: 'SokchoBadaBatang', sans-serif;
}
</style>