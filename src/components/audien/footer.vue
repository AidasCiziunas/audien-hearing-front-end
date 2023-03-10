<template>
  <div class="footer-area">
    <div class="footer-content">
      <div class="footer-logo mt-3">
        <img :src="require('@/assets/media/Logo.png')" alt="logo" />
        <a class="mb-3 ml-5">© 2023, Audien Hearing</a>
      </div>
      <div class="social-icon">
        <div class="links"><a>Privacy Policy </a>| <a>Terms of Use</a></div>
        <div>
          <v-btn color="#1F2F40;" class="mr-2">
            <img :src="require('@/assets/media/fb.png')"
          /></v-btn>
          <v-btn color="#1F2F40;" class="mr-2"
            ><img :src="require('@/assets/media/twitter.png')"
          /></v-btn>
          <v-btn color="#1F2F40;" class="mr-2"
            ><img :src="require('@/assets/media/instagram.png')"
          /></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

@media only screen and (min-width: 300px) and (max-width: 800px) {
  .footer-area{
    display: none;
  }
}
.footer-content {
  width: 90vw;
  display: flex;
  justify-content: space-around;
}
.footer-area {
  background: #07121c;
  /* height: 10vh; */
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 32px;
  min-width: 32px;
  padding: 0 16px;
}
.links {
  display: flex;
  gap: 3vh;

  color: #fff;
}
@media only screen and (min-width: 801px) and (max-width: 1400px) {
  .footer-area {
    background: #07121c;
    height: 15vh;
  }
}
</style>