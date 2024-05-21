<template>
    <div class="book-to-read-info">
        <div class="read-status"><span class="read-status-content">🌱읽을 예정</span></div>
        <div class="book-page">
        <img src="@/assets/dotori_logo.png" alt="dotori_logo" class="dotori-logo">
        <div class="book-page-content">
          <div class="book-page-tag">도토리에서 더 많은 책을 읽어보세요📚</div>  
          <div class="book-page-hegiht">책을 읽어서 <span>{{ calculateHeight }}</span>cm만큼 쌓였어요.</div>      
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: [ 'memberBook' ],
    computed: {
        calculateHeight() {
            const totalPage = 36;
            const page = Math.round(totalPage * 10  / 200) / 10;
            return page.toFixed(1);
        }
    }
}
</script>

<style scoped>
.book-to-read-info {
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

.book-page {
  margin-top: 20px;
  background-color: #F2EDE4;
  padding: 8px 0px 8px 5px;
  border-radius: 5px;
  display: flex;
}

.dotori-logo {
  width: 40px;
  height: 40px;
}

.book-page-content {
  margin-left: 5px;
}

.book-page-tag {
  font-weight: bold;
  margin-bottom: 5px;
}

.book-page-hegiht span {
  color: #F28379;
}
</style>