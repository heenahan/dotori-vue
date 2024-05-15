<template>
    <div class="search-view" @scroll="handleScroll">
        <input type="text" placeholder="책 검색하기" class="search-bar" v-model="query" @keyup.enter="submit">
        <LoadingView :isLoading="isLoading"/>
        <div v-for="(book, bookId) in books" :key="bookId" class="book-item">
            <img :src="book.coverPath" alt="#" class="book-image">
            <div class="book-info">
                <div class="book-title">{{ book.title }}</div>
                <div class="book-author">{{ book.author }}</div>
                <div class="book-publisher">{{ book.publisher }}</div>
            </div>
        </div>
    </div>
    <NavigationView/>
</template>

<script>
import NavigationView from './NavigationView.vue'
import LoadingView from './LoadingView.vue';
import axios from 'axios'

export default {
    components: {
        NavigationView,
        LoadingView
    },
    data() {
        return {
            books: [],
            isLoading: false,
            page: 1,
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
                setTimeout(() => this.addBookList(), 1000);
            }
        },
        addBookList() {
            axios.get(process.env.VUE_APP_DOTORI_API_URL + '/books/search', {
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
                this.size += 10;
                this.isLoading = false;

                this.books = data.content;
            }).catch((error) => {
                console.error(error)
            })
        },
        submit() {
            this.books = [];
            this.page = 1;
            this.size = 10;   
            this.isLoading = true;  
            
            console.log(this.query);
            this.addBookList();
        }
    }
}
</script>

<style scoped>
@import url(../assets/css/fonts.css);

.search-view {
    font-family: 'SokchoBadaBatang', sans-serif;
    height: calc(100vh - 65px);
    overflow: auto;
}

.search-bar {
    width: 380px;
    height: 40px;
    padding-left: 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.search::placeholder {
    color: #999;
}

.book-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
    height: 130px;
    width: 395px;
    
    border: 0px solid white;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.book-image {
    width: 100px;
    height: 130px;
    margin-right: 10px;
    border: 0.1px solid white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.book-info {
    height: 130px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    flex: 1;
}
.book-info > div {
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