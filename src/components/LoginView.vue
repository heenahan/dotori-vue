<template>
    <div class="container">
      <div class="title">늘 책과 함께, 도토리</div>
      <div class="dotori-logo">
        <img src="../assets/dotori_logo.png" alt="dotori logo" class="dotori-logo-image"/>
      </div>
      <div class="subtitle">나만의 독서 기록을 작성해보세요!</div>
      <div class="login-section">
        <a :href="googleLogin"><img src="../assets/google_login_img.png" alt="google login" class="login-image"/></a>
      </div>
    </div>
</template>

<script setup>
const googleLoginUrl = process.env.VUE_APP_GOOGLE_LOGIN_URL;
const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;
const googleRedirectUri = process.env.VUE_APP_GOOGLE_REDIRECT_URI;

const googleLogin = `${googleLoginUrl}?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`
</script>

<style scoped>
@import url(../assets/css/fonts.css);

.container {
    font-family: 'RIDIBatang';
    width: 395px;
    height: 900px;
    background-color: #FBF6EB;
    text-align: center;
}

.title {
  font-size: 32px;
  padding-top: 210px;
}

.dotori-logo-image {
    width: 170px;
    align-items: left;
    margin-top: 80px;
    margin-bottom: 80px;
}

.subtitle {
  font-size: 19px;
  margin-bottom: 35px;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
}

.login-image {
    width: 180;
    height: 42px;
}
</style>