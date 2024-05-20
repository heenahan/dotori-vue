<template>
    <TopNavigationView :message="message"/>
    <div class="member-book-detail">
        <div class="book-title">{{ memberBook.title }}</div>
        <div class="book-info">
            <div class="book-image"><img :src="memberBook.coverPath" /></div>
            <div class="book-info-detail">
                <div class="book-author"><span style="font-weight: bold;">지은이</span> | {{ memberBook.author }}</div>
                <div class="book-publisher"><span style="font-weight: bold;">출판사</span> | {{ memberBook.publisher }}</div>
                <div class="book-category"><span>#{{ memberBook.categoryName }}</span></div>
            </div>
        </div>
        <MemberBookToReadView :memberBook="memberBook" v-if="memberBook.memberBookStatus === 'TO_READ'"/>
        <MemberBookReadingView :memberBook="memberBook" v-else-if="memberBook.memberBookStatus === 'READING'"/>
        <MemberBookReadView :memberBook="memberBook" v-else/>
    </div>
    <BottomNavigationView />
</template>

<script>
import MemberBookToReadView from './MemberBookToReadView.vue';
import MemberBookReadingView from './MemberBookReadingView.vue';
import MemberBookReadView from './MemberBookReadView.vue';
import TopNavigationView from '../TopNavigationView.vue';
import BottomNavigationView from '../BottomNavigationView.vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
    components: {
        MemberBookToReadView,
        MemberBookReadingView,
        MemberBookReadView,
        TopNavigationView,
        BottomNavigationView
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
            memberBook: {},
            message: '수정하기'
        }
    }
}
</script>

<style scoped>
.member-book-detail {
    margin-top: 100px;
    width: 396px;
}

.book-title {
    font-size: 20%;
    font-weight: bold;
    width: 290px;
    text-align: center;
    margin: 0 auto;
    color: #444;    
}

.book-info {
    display: flex;
    align-items: flex-end;
    margin-top: 30px;
    margin-bottom: 20px;
}

.book-image > img{
    width: 160px;
    height: 210px;
    border-radius: 10px;
    box-shadow: 2px 3px 3px 0 rgba(0, 0, 0, 0.2);
}

.book-info-detail {
    margin-left: 20px;
    bottom: 0;
    color: #444;
}

.book-author, .book-publisher{ 
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
}

.book-category span {
    padding: 3px;
    text-align: center;
    font-size: 16px;
    color: white;
    border-radius: 5px;
    background-color: #9CD9C8;
    
}
</style>