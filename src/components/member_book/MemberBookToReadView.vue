<template>
    <div>
        <div>읽을 예정</div>
        <div>{{ `이 책을 읽으면 ${calculateHeight}cm만큼 쌓여요.` }}</div>
    </div>
</template>

<script>
export default {
    props: [ 'memberBook' ],
    computed: {
        calculateHeight() {
            const totalPage = 36;
            const page = Math.round(totalPage * 10  / 200) / 10;
            return page.toFixed(1);
        }
    }
}
</script>

<style scoped>

</style>