<template>
    <div class="book-read-info">
      <div class="read-status">🍁읽음</div>
      <div class="star">
        <div class="star-content" v-for="index in 5" :key="index">
          <span v-if="index > Math.ceil(memberBook.star)"><img src="@/assets/blank_star.png" alt="blank_star"></span>
          <span v-else-if="index === Math.ceil(memberBook.star) && memberBook.star % 1 !== 0"><img src="@/assets/half_star.png" alt="half_star"></span>
          <span v-else><img src="@/assets/star.png" alt="star"></span>
        </div>
      </div>
      <div class="book-level">
        <div class="book-level-tag">책 난이도</div>
        <div class="book-level-content">{{ `| ${convertBookLevel}` }}</div>
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
          <div class="end-date-content">{{ memberBook.endDate }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['memberBook'],
    computed: {
      calculateReadDate() {
        const startDate = new Date(this.memberBook.startDate);
        const endDate = new Date(this.memberBook.endDate);
        const day = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return Math.ceil(day);
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
      }
    }
  }
  </script>
  
<style scoped>
.book-read-info {
  font-size: 18px;
  color: #555;
}

.read-status {
    background-color: #9CD9C8;
    width: 65px;
    height: 25px;
    border: 0px;
    border-radius: 5px;
    color: white;
    text-align: center;
    padding-top: 2px;
    margin: 0 auto; 
    font-weight: bold;
}

.star {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;  
}

.star-content > span > img {
  width: 22px;
  height: 22px;
}

.book-level {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-level-tag {
  font-weight: bold;
}

.book-level-content {
  margin-left: 5px;
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

.start-date-content, .end-date-content {
  font-size: 18px;
}
</style>  