<template>
    <div class="book-reading-info">
      <div class="read-status"><span class="read-status-content">🌷읽는 중</span></div>
      <div class="read-rate">
        <div class="read-rate-tag">독서량</div>
        <div class="read-rate-message">{{ convertReadRateMessage }}</div>
        <progress class="progress-bar" :value="memberBook.percent" min="0" max="100"/>
        <div class="read-rate-content">
          <span class="percent">{{ memberBook.percent }}%</span>
          <span class="page">{{ memberBook.page }} .p / {{ memberBook.totalPage }} .p</span>
        </div>
      </div>
      <div class="read-date">
        <div class="read-date-tag">독서 기간</div>
        <div class="read-duration">
          <div class="calculated-read-date">{{ calculateReadDate }}</div>
          <div class="calculated-read-date-content">일 동안 읽었어요!</div>
        </div>
      </div>
      <div class="read-date-detail">
        <div class="start-date">
          <div class="start-date-tag">시작일</div>
          <div class="start-date-content">{{ memberBook.startDate }}</div>
        </div>
        <div class="end-date">
          <div class="end-date-tag">종료일</div>
          <div class="end-date-content">-</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: [ 'memberBook' ],
    computed: {
        calculateReadDate() {
            const startDate = new Date(this.memberBook.startDate);
            const endDate = new Date();
            const day = (endDate - startDate) / (1000 * 60 * 60 * 24);
            return Math.ceil(day);
        },
        convertReadRateMessage() {
          const percent = this.memberBook.percent;
          if (percent === 0) {
            return "🧘 독서를 시작해봐요.";
          }
          if (percent < 35) {
            return "🚶 책 맛보기 중"
          }
          if (percent < 70) {
            return "🔥 탐독하는 중"
          }
          if (percent < 100) {
            return "🏃 완독을 향해 달려가는 중"
          }
          return "🎉 책을 다 읽었어요!";
        }
    }
}
</script>

<style scoped>
.book-reading-info {
  font-size: 15px;
  color: #555;
  margin-top: 50px;
}

.read-status {
  text-align: center;
}

.read-status-content {
  background-color: #9CD9C8;
  border: 0px;
  border-radius: 5px;
  color: white;
  padding: 3px 2px 1px 1px;
  text-align: center;
}

.read-rate {
  margin-top: 40px;
}

.read-rate-tag {
  font-weight: bold;
}

.read-rate-message {
  margin-top: 15px;
  margin-bottom: 5px;
}

.progress-bar {
  width: 100%;
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
  width: 100%;
  margin-top: 5px;
}

.percent {
  color: #F28379;
}

.page {
  margin-left: auto;
  color: #555;
}

.read-date {
  color: #555;
  margin-top: 50px;
  display: flex;
  align-items: center;
}

.read-date-tag {
  padding-top: 1px;
  font-weight: bold;
}

.read-duration {
  margin-left: auto;
  display: flex;
}

.calculated-read-date {
  background-color: #F28379;
  width: 50px;
  border: 0px;
  padding-top: 1px;
  margin-right: 2px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  color: white;
}

.read-date-detail {
  color: #555;
  height: 50px;
  margin-top: 20px;
  display: flex;
  align-items: center; 
  border: 0px;
  border-radius: 5px;
  background-color: #F2EDE4;
}

.start-date, .end-date {
  display: flex;
}

.start-date {
  margin-left: 10px;
}

.end-date {
  margin-left: auto;
  margin-right: 10px;
}

.start-date-tag, .end-date-tag {
  margin-right: 8px;
  font-weight: bold;
}
</style>