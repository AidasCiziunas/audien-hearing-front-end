<template>
  <div class="headphone">
    <div class="headphone-image">
      <img :src="require('@/assets/media/headphones.png').default" />
     
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
  </div>
</template>
<style scoped>
.gradient-two {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  border-radius: 50%;
  z-index: 1;
  padding: 3vh;
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
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  border-radius: 50%;
  z-index: 1;
  padding: 3vh;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(26%, #ffb404),
    color-stop(151%, rgba(255, 255, 255, 0))
  );
  background: linear-gradient(270deg, #ffb40442 26%, rgb(255 180 4 / 2%) 151%);
}

.headphone-image {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  align-items: flex-end;
}

.banner-button {
  right: initial;
  top: initial;
  position: initial;
  margin: 0;

  position: absolute;
  bottom: -45px;
}
.get-start {
  display: flex;
  justify-content: center;

  width: 24vh;
  height: 24vh;
  position: relative;
  /* left: 3.3vh; */
  /* top: 2.9vh; */
  background: #ffb404;
  font-family: "Lato";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  text-transform: uppercase;
  color: #102132;
  border-radius: 50%;
  left: initial;
  top: initial;
}
@media only screen and (min-width: 801px) {
  .headphone {
    margin-top: 11vh;
    display: inline-block;
    position: relative;
    left: -3vw;
  }

  .headphone-image > img {
    height: 60vh;
  }
}
@media only screen and (max-width: 800px) {
  .headphone {
    position: relative;
    top: -30px;
  }
  .banner-button {
    top: 13vw;
    bottom: inherit;
  }
  .gradient-one {
    padding: 4vw;
  }
  .gradient-two {
    padding: 4vw;
  }
  .get-start {
    height: 34vw;
    width: 34vw;
    display: block;
  }

  .get-start img {
    height: 15vw;
    width: 15vw;
  }
  .headphone-image {
    -webkit-mask-image: -webkit-gradient(linear, left 50%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
  }
}
</style>
