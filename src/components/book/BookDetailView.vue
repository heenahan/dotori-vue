<template>
    <TopNavigationView @clickButton="createMemberBook" :message="message"/>
    <div class="book-detail">
        <LoadingView :isLoading="isLoading"/>
        <div class="book">
            <div class="book-title">{{ book.title }}</div>
            <img :src="book.coverPath" alt="book"/>
            <div class="book-author">{{ book.author }}</div>
            <div class="book-publisher">{{ book.publisher }}</div>
        </div>
        <ul class="book-info">
            <li class="book-info-item">
                <div class="book-info-tag">카테고리</div>
                <div class="book-info-context">{{ book.categoryName }}</div>
            </li>
            <li class="book-info-item">
                <div class="book-info-tag">페이지 수</div>
                <div class="book-info-context">{{ book.page }}</div>
            </li>
            <li class="book-info-item">
                <div class="book-info-tag">ISBN</div>
                <div class="book-info-context">{{ book.isbn13 }}</div>
            </li>
            <li class="book-info-item">
                <div class="book-info-tag">출판일</div>
                <div class="book-info-context">{{ book.publishDate }}</div>
            </li>
        </ul>
        <div>
            <div class="book-description">
                <div class="book-description-tag">책 소개</div>
                <div class="book-description-context">{{ book.description }}</div>
            </div>
            <div class="book-link"><a :href="book.link">책 구매 링크</a></div>
            <div class="database-tag">도서 DB 제공: 알라딘</div>
        </div>
    </div>
    <BottomNavigationView />
</template>

<script>
import LoadingView from '@/components/LoadingView.vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import TopNavigationView from '@/components/navigation/TopNavigationView.vue'
import BottomNavigationView from '@/components/navigation/BottomNavigationView.vue'

export default {
    components: {
        LoadingView,
        TopNavigationView,
        BottomNavigationView
    },
    beforeMount() {
        const route = useRoute();
        const { isbn } = route.params;
        axios.get(process.env.VUE_APP_DOTORI_API_URL + '/books/' + isbn, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            const { data } = response.data;

            this.isLoading = false;
            this.book = data;
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {
            router: useRouter(),
            isLoading: true,
            book: {},
            message: '기록하기'
        }
    },
    methods: {
        createMemberBook() {
            axios.post(process.env.VUE_APP_DOTORI_API_URL + '/member-books', {
                isbn: this.book.isbn13,
                memberBookStatus: 'TO_READ'
            }, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            }).then((response) => {
                const { data } = response.data;
                this.router.push('/member-book/' + data.memberBookId);
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
</script>

<style scoped>
@import url("@/assets/css/fonts.css");
.book-detail {
    font-family: 'SokchoBadaBatang', sans-serif;
    width: 396px;
    padding-top: 100px;
    padding-bottom: 60px;
}

.container::-webkit-scrollbar {
    display: none;
}

.book {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.book img {
    width: 200px;
    height: 250px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
}

.book-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-style: bold;
}

.book-author, .book-publisher {
    margin-top: 20px;
    font-size: 16px;
    color: #666;
}

.book-publisher {
    margin-bottom: 40px;
}

.book-info {
    display: flex;
    overflow-x: auto; 
    padding: 0;
    list-style: none; 
}

.book-info::-webkit-scrollbar{
  display:none;
}

.book-info-item {
    display: inline-block;
}

.book-info-tag {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 17px;
    color: #00B992;
}

.book-info-context {
    color: #666;
    font-size: 16px;

}

.book-info-tag, .book-info-context {
    width: 155px;
    text-align: center;
}

.book-description {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: left;
}

.book-description-tag {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 20px;
    color: #00B992;
}

.book-description-context {
    font-size: 16px;
    color: #666;
}

.book-link>a:link, .book-link>a:visited {
    font-size: 16px;
    color: #00B992;
}

.database-tag {
    margin-top: 20px;
    text-align: right;
    color: #666;
}
</style>