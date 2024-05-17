<template>
    <div>
        <img :src="memberBook.coverPath" />
        <div>{{ memberBook.title }}</div>
        <div>{{ memberBook.author }}</div>
        <div>{{ memberBook.publisher }}</div>
        <div>{{ memberBook.categoryName }}</div>
        <MemberBookToReadView :memberBook="memberBook" v-if="memberBook.memberBookStatus === 'TO_READ'"/>
        <MemberBookReadingView :memberBook="memberBook" v-else-if="memberBook.memberBookStatus === 'READING'"/>
        <MemberBookReadView :memberBook="memberBook" v-else/>
    </div>
</template>

<script>
import MemberBookToReadView from './MemberBookToReadView.vue';
import MemberBookReadingView from './MemberBookReadingView.vue';
import MemberBookReadView from './MemberBookReadView.vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
    components: {
        MemberBookToReadView,
        MemberBookReadingView,
        MemberBookReadView
    },
    beforeMount() {
        console.log(this.route.params);
        axios.get(process.env.VUE_APP_DOTORI_API_URL + '/member-books/' + this.route.params.memberBookId, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            const { data } = response.data;
            this.memberBook = data;
            console.log(this.memberBook);
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {
            route: useRoute(),
            memberBook: {}
        }
    }
}
</script>

<style lang="scss" scoped>

</style>