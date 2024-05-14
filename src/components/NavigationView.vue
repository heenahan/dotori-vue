<template>
    <nav>
        <ul>
            <li><a href="#">검색</a></li>
            <li><a href="#">서재</a></li>
            <li><a href="#">통계</a></li>
            <li><a href="#">설정</a></li>
        </ul>
    </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: #F2EDE4;
    width: 412px;
    height: 55px;
}
ul {
    list-style-type: none;
    text-align: center;
    padding: 0px;
}

li {
    box-sizing: border-box;
    display: inline-block;
    width: 25%;
    height: 100%;
}

a {
    font-family: 'SokchoBadaBatang', sans-serif;
    font-size: 19px;
    text-decoration: none;
    color: #000000;
}


a:hover {
    color: #732C02;
}
</style>