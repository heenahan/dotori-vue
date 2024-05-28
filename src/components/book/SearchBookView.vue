<template>
    <div class="search-view" @scroll="handleScroll">
        <input type="text" placeholder="책 검색하기" class="search-bar" v-model="query" @keyup.enter="submit">
        <LoadingView :isLoading="isLoading"/>
        <div class="book-items">
            <div v-for="book in books" :key="book.isbn13" class="book-item" @click="showBookDetail(book.isbn13)">
                <img :src="book.coverPath" alt="#" class="book-image">
                <div class="book-info">
                    <div class="book-title">{{ book.title }}</div>
                    <div class="book-author">{{ book.author }}</div>
                    <div class="book-publisher">{{ book.publisher }}</div>
                </div>
            </div>
        </div>
    </div>
    <BottomNavigationView/>
</template>

<script>
import BottomNavigationView from '@/components/navigation/BottomNavigationView.vue'
import LoadingView from '@/components/LoadingView.vue';
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    components: {
        BottomNavigationView,
        LoadingView
    },
    data() {
        return {
            router: useRouter(),
            books: [],
            page: 0,
            size: 10,
            hasNext: false,
            query: ''
        }
    },
    methods: {
        handleScroll(event) {
            const { scrollHeight, scrollTop, clientHeight } = event.target;
            const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
            
            // 스크롤 마지막이고 다음 페이지가 있는 경우
            if (isAtTheBottom && this.hasNext) {
                // 무한히 호출하지 못하도록 1초 딜레이
                setTimeout(() => {
                    this.addBookList().then((books) => {
                        this.books = this.books.concat(books);
                    })
                }, 1000);
            }
        },
        async addBookList() {
            return await axios.get(process.env.VUE_APP_DOTORI_API_URL + '/books/search', {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                },
                params: {
                    query: this.query,
                    page: this.page,
                    size: this.size
                }
            }).then((response) => {
                const data = response.data.data;

                this.hasNext = !data.last;
                this.page += 1;
                this.isLoading = false;

                return data.content;
            }).catch((error) => {
                console.error(error)
            })
        },
        submit() {
            this.books = [];
            this.page = 0;
            this.size = 10;   
            this.isLoading = true;  
            
            this.addBookList().then((books) => {
                this.books = books;
            });
        },
        showBookDetail(isbn) {
            this.router.push('/book/' + isbn);
        }
    }
}
</script>

<style scoped>
@import url("@/assets/css/fonts.css");

.search-view {
    font-family: 'SokchoBadaBatang', sans-serif;
    height: calc(100vh - 65px); 
    overflow: auto;
    width: 396px;
}

.search-view::-webkit-scrollbar {
    display: none;
}

.search-bar {
    width: 97.5%;
    height: 40px;
    padding-left: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.search::placeholder {
    color: #999;
}

.book-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.book-item {
    display: flex;
    margin-bottom: 5px;
    width: 98.5%;

    border: 0px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.book-image {
    width: 100px;
    height: 130px;
    margin-right: 8px;
    border: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.book-info {
    height: 130px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    flex: 1;
}
.book-title, .book-author, .book-publisher{
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 두 줄까지만 보이도록 설정 */
}

.book-title {
    height: 35px;
    margin-bottom: 13px;
    font-size: 15px;
    font-weight: bold;
}

.book-author {
    font-size: 13px;
    color: #666;
}

.book-publisher {
    font-size: 13px;
    color: #666;
}
</style>