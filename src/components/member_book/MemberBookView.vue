<template>
    <div class="member-book-view" @scroll="handleScroll">
        <div class="title">나의 서제</div>
        <div class="member-book-status">
            <div class="member-book-status-tag">전체</div>
            <div class="member-book-status-tag">읽음</div>
            <div class="member-book-status-tag">읽는 중</div>
            <div class="member-book-status-tag">읽을 예정</div>
        </div>
        <LoadingView :isLoading="isLoading"/>
        <div class="member-books">
            <div v-for="memberBook in memberBooks" :key="memberBook.id" class="member-book-item">
                <img :src="memberBook.coverPath" alt="#" class="member-book-image">
                <div class="member-book-detail-info">
                    <div class="book-info">
                        <div class="book-title">{{ memberBook.title }}</div>
                        <div class="book-author">{{ memberBook.author }}</div>                
                    </div>
                    <div class="member-book-info" v-if="memberBook.memberBookStatus === 'READ'">
                        <div class="star">
                            <div class="star-content" v-for="index in 5" :key="index">
                                <span v-if="index > Math.ceil(memberBook.star)"><img src="@/assets/blank_star.png" alt="blank_star"></span>
                                <span v-else-if="index === Math.ceil(memberBook.star) && memberBook.star % 1 !== 0"><img src="@/assets/half_star.png" alt="half_star"></span>
                                <span v-else><img src="@/assets/star.png" alt="star"></span>
                            </div>
                        </div>
                        <div class="read-date">
                            <div class="start-date">
                                <span class="start-date-tag">시작일</span>
                                <span class="start-date-content">{{ memberBook.startDate }}</span>
                            </div>
                            <div class="end-date">
                                <span class="end-date-tag">종료일</span>
                                <span class="end-date-content">{{ memberBook.endDate }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="memberBook.memberBookStatus === 'READING'">
                        <div class="read-rate">
                            <progress class="progress-bar" :value="memberBook.percent" min="0" max="100"/>
                            <div class="read-rate-content">
                                <span class="percent">{{ memberBook.percent }}%</span>
                                <span class="page">{{ memberBook.page }} / {{ memberBook.totalPage }} .p</span>
                            </div>
                        </div>
                        <div class="read-date">
                            <div class="start-date">
                                <span class="start-date-tag">시작일</span>
                                <span class="start-date-content">{{ memberBook.startDate }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="book-height">
                            <span class="book-height-content">+{{ calculateHeight(memberBook) }}cm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BottomNavigationView/>
</template>

<script>
import axios from 'axios';
import LoadingView from '@/components/LoadingView.vue';
import BottomNavigationView from '@/components/navigation/BottomNavigationView.vue';

export default {
    components: {
        LoadingView,
        BottomNavigationView
    },
    beforeMount() {
        this.isLoading = true;
        axios.get(process.env.VUE_APP_DOTORI_API_URL + '/member-books', {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            const data = response.data.data;
            this.isLoading = false;
            this.memberBooks = data.content;
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {
            memberBooks: [],
            isLoading: false,
            page: 1,
            size: 10,
            hasNext: false
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
    },
    computed: {
        calculateHeight() {
            return (memberBook) => {
                const totalPage = memberBook.totalPage;
                const page = Math.round(totalPage * 10  / 200) / 10;
                return page.toFixed(1);
            }
        }
    },
}
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #F28379;
}
.member-book-status {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 15px;
}

.member-book-status-tag {
    width: 25%;
    text-align: center;
    font-size: 16px;

}

.member-book-view {
    font-family: 'SokchoBadaBatang', sans-serif;
    height: calc(100vh - 65px); 
    overflow: auto;
    width: 396px;
}

.member-book-view::-webkit-scrollbar {
    display: none;
}

.member-books {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.member-book-item {
    display: flex;
    margin-bottom: 5px;
    width: 98.5%;
    border: 0px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.member-book-image {
    width: 100px;
    height: 130px;
    margin-right: 8px;
    border: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.member-book-detail-info {
    height: 130px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    flex: 1;
}

.book-title, .book-author{
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 한 줄까지만 보이도록 설정 */
}

.book-author {
    margin-top: 5px;
    color: #555;
    font-size: 13px;
}

.star {
    display: flex;
}

.star-content > span > img {
    width: 18px;
    height: 18px;
}

.progress-bar {
    width: 100%;
    height: 10px;
    appearance: none;
}

.progress-bar::-webkit-progress-bar {
    background-color: #F2EDE4;
    border-radius: 5px;
}

.progress-bar::-webkit-progress-value {
    background-color: #9CD9C8;
    border-radius: 5px;
}

.read-rate-content {
    display: flex;
    margin-top: 5px;
}

.percent {
    font-size: 13px;
    color: #F28379;
}

.page {
    font-size: 13px;
    margin-left: auto;
    color: #555;
}

.read-date {
    display: flex;
    margin-top: 5px;
    font-size: 13px;
}

.start-date-tag, .end-date-tag {
    color: #F28379;
    margin-right: 8px;
}

.start-date-content, .end-date-content {
    color: #555;
}

.end-date {
    margin-left: auto;
}

.book-height {
    display: flex;
    justify-content: right;
}

.book-height-content {
    border-radius: 10px;
    background-color: #9CD9C8;
    font-size: 13px;
    color: white;
    font-weight: bold;
    padding: 5px;
}
</style>