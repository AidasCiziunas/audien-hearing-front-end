<template>
  <div class="headphone">
    <div class="banner-image">
      <img :src="require('@/assets/media/headphones.png').default" />
    </div>
    <div class="banner-button">
      <div class="gradient-one">
        <div class="gradient-two">
          <button @click="$router.push('/birth-day')" class="get-start">
            <img :src="require('@/assets/media/sound.png')" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style scoped>
@media only screen and (min-width: 300px) and (max-width: 900px) {
.headphone{
  display: none !important;
}
}
@media only screen and (min-width: 300px) and (max-width: 400px) {
  .banner-image {
    position: absolute !important;
    bottom: 0px !important;
    left: 33vw !important;
    width: 100vw !important;
}
.banner-button {
    position: absolute !important;
    top: 15vh !important;
    right: -38.7vh !important;
    left: 57vw !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
}

    .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
    left: -3vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
}
@media only screen and (min-width: 701px) and (max-width: 750px) {
  .banner-image {
      position: absolute !important;
    bottom: 0px !important;
   left: -30vw !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -40vw !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
   .headphone .get-start {
    width: 22vh;
    height: 22vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 26vh !important;
    height: 26vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 32vh !important;
    height: 32vh;
    /* bottom: 24px; */
    top: 11vh;
   left: -12vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
}
@media only screen and (min-width: 651px) and (max-width: 700px) {
  .banner-image {
      position: absolute !important;
    bottom: 0px !important;
   left: -27vw !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -50vw !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
   .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
   left: -12vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
}
@media only screen and (min-width: 601px) and (max-width: 650px) {
  .banner-image {
      position: absolute !important;
    bottom: 0px !important;
   left: -20vw !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -55vw !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
   .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
   left: -12vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
}
@media only screen and (min-width: 551px) and (max-width: 600px) {
  .banner-image {
      position: absolute !important;
    bottom: 0px !important;
   left: -12vw !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -66vw !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
   left: -12vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
}
@media only screen and (min-width: 501px) and (max-width: 550px) {
  .banner-image {
      position: absolute !important;
    bottom: 0px !important;
   left: -6% !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -44.7vh !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
   left: -12vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
}
@media only screen and (min-width: 401px) and (max-width: 500px) {
  .headphone{display: none;}
  .banner-image {
    position: absolute !important;
    bottom: 0px !important;
    left: 22vw !important;
    width: 100vw !important;
}
  .banner-button {
    position: absolute !important;
    top: 15vh !important;
   right: -44.7vh !important;
    z-index: 1;
    /* margin: -6.1vw; */
    height: 10px;
  }
  .headphone .get-start {
    width: 20vh;
    height: 20vh;
    position: relative;
    left: 2.3vh;
    top: 1.9vh;
    background: #ffb404;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    /* line-height: 6vh; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    /* letter-spacing: 0.1em; */
    text-transform: uppercase;
    color: #102132;
    border-radius: 50%;
  }
  .headphone .gradient-two {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 24vh !important;
    height: 24vh;
    /* bottom: 24px !important; */
    top: 2vh;
    left: 3.5vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .headphone .gradient-one {
    position: relative;
    top: 0px;
    border-radius: 50%;
    z-index: 1;
    /* margin: -5.1vw; */
    width: 28vh !important;
    height: 29vh;
    /* bottom: 24px; */
    top: 11vh;
    left: -3vw !important;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(26%, #ffb40442),
      color-stop(151%, rgb(255 180 4 / 2%))
    );
    background: linear-gradient(
      270deg,
      #ffb40442 26%,
      rgb(255 180 4 / 2%) 151%
    );
  }
  .get-start img {
    position: absolute;
    width: 56% !important;
    left: 5vh;
    height: 9vh !important;
  }
}
/* sdsds */
.headphone {
  position: fixed;
  top: 58vh;
  right: 68vh;
}
@media only screen and (min-width: 801px) and (max-width: 1400px) {
  .headphone {
    position: absolute !important;
    top: 15vh !important;
    right: 192vh !important;
  }
  .banner-button {
    position: relative !important;
    top: 48vh !important;

    left: 173vh !important;
    z-index: 1 !important;
  }
  .banner-image {
    position: relative !important;
    top: 21vh !important;
    left: 162vh !important;
    height: 10vh !important;
  }
}
.get-start img {
  position: absolute;
  left: 6vh;
  height: 14vh;
}

.gradient-two {
  position: relative;
  top: 0px;
  border-radius: 50%;
  z-index: 1;
  /* margin: -5.1vw; */
  width: 32vh !important;
  height: 32vh;
  /* bottom: 24px !important; */
  top: 3vh;
  left: 1.5vw !important;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(26%, #ffb40442),
    color-stop(151%, rgb(255 180 4 / 2%))
  );
  background: linear-gradient(270deg, #ffb40442 26%, rgb(255 180 4 / 2%) 151%);
}
.gradient-one {
  position: relative;
  top: 0px;
  border-radius: 50%;
  z-index: 1;
  /* margin: -5.1vw; */
  width: 38vh !important;
  height: 38vh;
  /* bottom: 24px; */
  top: 5vh;
  left: 6vw !important;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(26%, #ffb404),
    color-stop(151%, rgba(255, 255, 255, 0))
  );
  background: linear-gradient(270deg, #ffb40442 26%, rgb(255 180 4 / 2%) 151%);
}

/* .yellow-circle {
  
    width: 34vh;
    height: 34vh;
    border-radius: 50%;
    left: 6vw;
   background: -webkit-gradient(linear, left top, left bottom, from(#FFB404), to(rgba(255, 180, 4, 0)));
    background: linear-gradient(180deg, #FFB404 0%, rgba(255, 180, 4, 0) 100%);
      opacity: 0.3;
}
.yellow-circle-2 {
    position: absolute;
    bottom: 14vw;
   
    width: 29vh;
    height: 29vh;
    border-radius: 50%;
    left: 6vw;
    background: -webkit-gradient(linear, left top, left bottom, from(#FFB404), to(rgba(255, 180, 4, 0)));
    background: linear-gradient(180deg, #FFB404 0%, rgba(255, 180, 4, 0) 100%);
    opacity: 0.3;
} */
.yellow-button {
  background-color: rgb(255, 180, 4);
  border-color: rgb(255, 180, 4);
  position: absolute !important;
  top: 45vh;
  position: absolute;
  right: 45vh;
  width: 22vh !important;
  height: 21vh !important;
  z-index: 2147483647;
  border-radius: 50%;
}
.banner-image {
  position: fixed;
  right: 5%;
  top: 15vh;
  height: 10vh;
}
.banner-button {
  position: fixed;
  top: 57vh;
  right: 63.3vh;
  z-index: 1;
  /* margin: -6.1vw; */
  height: 10px;
}
.get-start {
  width: 26vh;
  height: 26vh;
  position: relative;
  left: 3.3vh;
  top: 2.9vh;
  background: #ffb404;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  /* line-height: 6vh; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  /* letter-spacing: 0.1em; */
  text-transform: uppercase;
  color: #102132;
  border-radius: 50%;
}

.banner-image img {
  height: 65vh;
}
</style>