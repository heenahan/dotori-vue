<template>
    <div class="loading" v-if="isLoading">
        <img src="../assets/book_flip.gif" alt="loading"/>
        <div class="message">책을 가져오는 중...</div>
    </div>
</template>

<script>
export default {
    props: [ 'isLoading' ]
}
</script>

<style scoped>
@import url(../assets/css/fonts.css);

.loading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 396px;
    height: 600px;
}

.loading img {
    width: 110px;
    height: 110px;
    position: absolute;
    top: 50%;
}
.message {
    font-family: 'SokchoBadaBatang', sans-serif;
    position: absolute;
    top: 70%;
}
</style>