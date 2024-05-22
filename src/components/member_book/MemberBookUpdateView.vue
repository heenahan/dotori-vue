<template>
    <div class="member-book-update">
        <div>책을 기록해보세요</div>
        <div @click="handleModal('block')">
            <div>📚 읽기 상태</div>
            <div>{{ convertMemberBookStatus }}</div>
        </div>
        <div class="member-book-background" :style="statusSelectStyle" @click="handleModal('none')">
            <div class="member-book-status-select" >
                <div class="member-book-status-tag">읽기 상태 선택</div>
                <div class="member-book-status-content" @click="changeMemberBookStatus('TO_READ')">🌱 읽을 예정</div>
                <div class="member-book-status-content" @click="changeMemberBookStatus('READING')">🌷 읽는 중</div>
                <div class="member-book-status-content" @click="changeMemberBookStatus('READ')">🍁 읽음</div>
            </div>
        </div>
        <div class="member-book-reading" v-if="memberBook.memberBookStatus === 'READING'">
            <VDatePicker v-model="memberBook.startDate" label="읽기 시작한 날짜" type="date">
                <template #default="{ togglePopover }">
                    <div @click="togglePopover">시작 날짜 : {{ memberBook.startDate }}</div>
                </template>
            </VDatePicker>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
    beforeMount() {
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
            statusSelectStyle: {
                display: 'none'
            }
        }
    },
    methods: {
        handleModal(display) {
            this.statusSelectStyle.display = display;
        },
        changeMemberBookStatus(status) {
            this.memberBook.memberBookStatus = status;
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
            }
            return "";
        }
    }
}
</script>

<style scoped>
.member-book-update {
    width: 396px;
}

.member-book-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 412px;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.member-book-status-select {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    border-radius: 20px 20px 0px 0px;
    background-color: #F2EDE4;
}

.member-book-status-tag {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25%;
}

.member-book-status-content {
    font-size: 18px;
    height: 25%;
    padding-left: 20px;
    text-align: left;
    display: flex;
    align-items: center;
}

.member-book-status-content:hover {
    background-color: #888;
}
</style>