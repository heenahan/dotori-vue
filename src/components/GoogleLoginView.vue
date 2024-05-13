<template>
    <div/>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter();
const { code }= router.currentRoute.value.query;

axios.get(process.env.VUE_APP_DOTORI_API_URL + '/auth/login/google', {
    params: {
        code: code
    }
}).then((response) => {
    const data = response.data;
    const { accessToken, tokenType } = data.data;
    const token = `${tokenType} ${accessToken}`
    
    localStorage.setItem("accessToken", token);    
    router.push('/')                
}).catch((error) => {
    console.error(error)
})
</script>

<style lang="scss" scoped>

</style>