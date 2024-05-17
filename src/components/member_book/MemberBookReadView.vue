<template>
    <div>
        <div>읽음</div>
        <div>{{ `${calculateReadDate}일 동안 읽었어요!` }}</div>
    </div>
</template>

<script>
export default {
    props: [ 'memberBook' ],
    computed: {
        calculateReadDate() {
            const startDate = new Date(this.memberBook.startDate);
            const endDate = new Date(this.memberBook.endDate);
            const diff = endDate - startDate;
            const day = diff / (1000 * 60 * 60 * 24);
            return day;
        }
    }
}
</script>

<style lang="scss" scoped>

</style> 