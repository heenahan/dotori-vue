<template>
    <div class="member-book-update">
        <div>책을 기록해보세요</div>
        <div class="member-book-status" @click="handleStatusModal('block')">
            <div class="member-book-status-tag">📚 읽기 상태</div>
            <div class="member-book-status-content">{{ convertMemberBookStatus }}</div>
        </div>
        <div class="member-book-background" :style="statusSelectStyle" @click="handleStatusModal('none')">
            <div class="member-book-status-select">
                <div class="member-book-status-select-tag">읽기 상태 선택</div>
                <div class="member-book-status-select-content" @click="changeMemberBookStatus('TO_READ')">🌱 읽을 예정</div>
                <div class="member-book-status-select-content" @click="changeMemberBookStatus('READING')">🌷 읽는 중</div>
                <div class="member-book-status-select-content" @click="changeMemberBookStatus('READ')">🍁 읽음</div>
            </div>
        </div>
        <div class="member-book-reading" v-if="memberBook.memberBookStatus === 'READING'">
            <VDatePicker v-model.string="memberBook.startDate" :masks="masks" :max-date="maxDate">
                <template #default="{ togglePopover }">
                    <div class="start-date" @click="togglePopover">
                        <div class="start-date-tag">⏰ 시작 날짜</div>
                        <div class="start-date-content">{{ memberBook.startDate }}</div>
                    </div>
                </template>
            </VDatePicker>
            <div class="page" @click="handlePageModal('block')">
                <div class="page-tag">📖 읽은 페이지</div>
                <div class="page-content">
                    {{ memberBook.page }}.p 
                    <span> / {{ memberBook.totalPage }}.p</span>
                </div>
            </div>
            <div class="page-background" :style="pageSelectStyle">
                <div class="page-select" :onKeyup="enterKey">
                    <div class="page-select-tag">읽은 페이지 입력</div>
                    <div class="page-select-content">
                        <input type="number" v-model="memberBook.page" />
                    </div>
                </div>
            </div>
        </div>
        <div class="member-book-read" v-else-if="memberBook.memberBookStatus === 'READ'">
            <VDatePicker v-model.string="memberBook.startDate" :masks="masks" :max-date="maxDate">
                <template #default="{ togglePopover }">
                    <div class="start-date" @click="togglePopover">
                        <div class="start-date-tag">⏰ 시작 날짜</div>
                        <div class="start-date-content">{{ memberBook.startDate }}</div>
                    </div>
                </template>
            </VDatePicker>
            <VDatePicker v-model.string="maxDate" :masks="masks" :min-date="memberBook.startDate" :max-date="new Date()">
                <template #default="{ togglePopover }">
                    <div class="end-date" @click="togglePopover">
                        <div class="end-date-tag">⏰ 종료 날짜</div>
                        <div class="end-date-content">{{ maxDate }}</div>
                    </div>
                </template>
            </VDatePicker>
            <div class="star">
                <div class="star-bar-tag">✨ 별점</div>
                <div class="star-contents">
                    <input class="star-bar" type="range" v-model="tempStar" step="0.5" min="0" max="5">
                    <div class="stars-content">
                        <div class="star-content" v-for="index in 5" :key="index">
                            <span v-if="index > Math.ceil(tempStar)"><img src="@/assets/blank_star.png" alt="blank_star"></span>
                            <span v-else-if="index === Math.ceil(tempStar) && tempStar % 1 !== 0"><img src="@/assets/half_star.png" alt="half_star"></span>
                            <span v-else><img src="@/assets/star.png" alt="star"></span>
                        </div>
                        <span class="temp-star">{{ tempStar }} / 5</span>
                    </div>
                </div>
            </div>
            <div class="book-level">
                <div class="book-level-tag">📚 책 난이도</div>
                <div class="book-level-content" @click="handleBookLevelModal('block')">{{ convertBookLevel }}</div>
            </div>
            <div class="book-level-background" :style="bookLevelSelectStyle" @click="handleBookLevelModal('none')">
                <div class="book-level-select">
                    <div class="book-level-select-tag">읽기 상태 선택</div>
                    <div class="book-level-select-content" @click="changeBookLevel('EASY')">쉬워요</div>
                    <div class="book-level-select-content" @click="changeBookLevel('A_LITTLE_EASY')">조금 쉬워요</div>
                    <div class="book-level-select-content" @click="changeBookLevel('MEDIUM')">보통이에요</div>
                    <div class="book-level-select-content" @click="changeBookLevel('A_LITTLE_DIFFICULT')">조금 어려워요</div>
                    <div class="book-level-select-content" @click="changeBookLevel('DIFFICULT')">어려워요</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    beforeMount() {
        axios.get(process.env.VUE_APP_DOTORI_API_URL + '/member-books/' + this.route.params.memberBookId, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            const { data } = response.data;
            this.memberBook = data;
            this.tempStar = data.star || 0; // 초기 별점 설정
            console.log(this.memberBook);
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {
            route: useRoute(),
            memberBook: {},
            statusSelectStyle: {
                display: 'none'
            },
            pageSelectStyle: {
                display: 'none'
            },
            bookLevelSelectStyle: {
                display: 'none'
            },
            masks: {
                modelValue: 'YYYY-MM-DD'
            },
            maxDate: new Date().toISOString().slice(0, 10),
            tempStar: 0 // 마우스오버 시 임시 별점
        };
    },
    methods: {
        handleStatusModal(display) {
            this.statusSelectStyle.display = display;
        },
        handlePageModal(display) {
            this.pageSelectStyle.display = display;
        },
        handleBookLevelModal(display) {
            this.bookLevelSelectStyle.display = display;
        },
        enterKey() {
            if (window.event.keyCode === 13) {
                this.handlePageModal('none');
            }
        },
        changeBookLevel(level) {
            this.memberBook.bookLevel = level;
            this.bookLevelSelectStyle.display = 'none';
        },
        changeMemberBookStatus(status) {
            this.memberBook.memberBookStatus = status;
            if (status === 'READING') {
                this.memberBook.startDate = new Date().toISOString().slice(0, 10);
                this.maxDate = new Date().toISOString().slice(0, 10);
            } else if (status === 'READ') {
                this.memberBook.startDate = new Date().toISOString().slice(0, 10);
                this.memberBook.bookLevel = 'EASY';
            }
            this.statusSelectStyle.display = 'none';
        }
    },
    computed: {
        convertMemberBookStatus() {
            switch (this.memberBook.memberBookStatus) {
                case "TO_READ":
                    return "읽을 예정";
                case "READING":
                    return "읽는 중";
                case "READ":
                    return '읽음';
                default:
                    return "";
            }
        },
        convertBookLevel() {
            switch (this.memberBook.bookLevel) {
                case "EASY":
                return "쉬워요";
                case "A_LITTLE_EASY":
                return "조금 쉬워요";
                case "MEDIUM":
                return "보통이에요";
                case "A_LITTLE_DIFFICULT":
                return "조금 어려워요";
                case "DIFFICULT":
                return "어려워요";
                default:
                return "";
            }
        },
    }
};
</script>

<style scoped>
.member-book-update {
    width: 412px;
}

.member-book-status, .start-date, .end-date, .page, .book-level {
    background-color: #F2EDE4;
    max-width: 96%;
    border-radius: 15px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.3);
    margin-top: 20px;
}

.member-book-status-tag, .start-date-tag, .end-date-tag, .page-tag, .star-bar-tag, .book-level-tag {
    font-size: 16px;
    padding: 20px 0 0 20px;
    font-weight: bold;
}

.member-book-status-content, .start-date-content, .end-date-content, .page-content, .book-level-content{
    font-size: 20px;
    padding: 20px 0 20px 20px;
}

.member-book-background, .page-background, .book-level-background {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 412px;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.member-book-status-select, .page-select, .book-level-select {
    position: inherit;
    bottom: 0;
    width: 412px;
    background-color: #F2EDE4;
    border-radius: 20px 20px 0 0;
}

.member-book-status-select-tag, .page-select-tag, .book-level-select-tag {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.member-book-status-select-content, .page-select-content, .book-level-select-content {
    font-size: 18px;
    padding: 20px;
}

.member-book-status-select-content:hover, .book-level-select-content:hover {
    background-color: #ddd;
}

.page-content span {
    font-size: 15px;
    color: #555;
}

.page-select-content input {
    width: 100%;
    height: 35px;
    font-size: 20px;
    text-align: center;
}

.star {
    margin-top: 20px;
    background-color: #F2EDE4;
    max-width: 96%;
    border-radius: 15px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.3);
}

.star-contents {
    position: relative;
    padding: 20px 0 20px 20px;
}

.star-bar {
    opacity: 0;
}

.stars-content {
    position: absolute;
    top: 13px;
    left: 23px;
    display: flex;
    pointer-events: none;
}

.star-content img {
    width: 25px;
    height: 25px;
}

.stars-content > span {
    font-size: 16px;
    margin-left: 10px;
    margin-top: 10px
}
</style>
