<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">Finish</span>
          <h1 class="mt-5">Thank you for taking our <span>hearing screener</span></h1>
          <p class="mb-5">Hearing solutions an Audient Hearing</p>
        </div>
        <div class="align-step-button mt-16">
          <v-btn
            class="warning-button-outline mr-5 mt-2"
            @click="$router.push('/')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/rotate-cw.png')"
          /></v-btn>
          <v-btn class="warning-button mt-2" @click="$router.push('/finish')">
            Take the test again
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')" />
          </v-btn>
        </div>
      </div>
      <div class="finish-right-side back-office-page mobile-right right-side">
        <div class="mobile-products-container">
          <div class="product-item">
            <div>
              <img
                class="button-img"
                height="70"
                width="70"
                :src="require('@/assets/media/1.png').default"
              />
            </div>
            <div>
              <div class="text-card">Atom Pro</div>
              <div>
                <v-btn
                  class="buy-now-btn mt-2"
                  @click="$router.push('/finish')"
                  color="#ffb404"
                >
                  <img :src="require('@/assets/media/cart.png')" />
                  <span class="ml-2">Buy now</span>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="product-item">
            <div>
              <img
                class="button-img"
                height="70"
                width="70"
                :src="require('@/assets/media/2.png').default"
              />
            </div>
            <div>
              <div class="text-card">Atom</div>
              <div>
                <v-btn
                  class="buy-now-btn mt-2"
                  @click="$router.push('/finish')"
                  color="#ffb404"
                >
                  <img :src="require('@/assets/media/cart.png')" />
                  <span class="ml-2">Buy now</span>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="product-descriptions">
          <v-row class="mb-16">
            <v-col cols="5">
              <div class="button-dev">
                <img
                  class="button-img"
                  height="70"
                  width="70"
                  :src="require('@/assets/media/2.png').default"
                />

                <div class="text-card">Atom</div>

                <div class="features">
                  <div class="features__item">
                    <div class="item__name">Portable charging case</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-not-available.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Smallest size avaliable</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-not-available.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Patented Comfort+ design</div>
                    <div class="item__icon">
                      <img
                        :src="require('@/assets/media/feat-comfort-plus-design.png')"
                      />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Enhanced feedback cancelation</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-not-available.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Atom sound technology</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-atom-sound.png')" />
                    </div>
                  </div>
                  <div class="features__item features__item-last">
                    <div class="item__name">24hr rechargeable battery</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-24h-battery.png')" />
                    </div>
                  </div>

                  <v-btn
                    class="buy-now-btn mt-2"
                    @click="$router.push('/finish')"
                    color="#ffb404"
                  >
                    <img :src="require('@/assets/media/cart.png')" />
                    <span class="ml-2">Buy now</span>
                  </v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="5">
              <div class="button-dev">
                <img
                  class="button-img"
                  height="70"
                  width="70"
                  :src="require('@/assets/media/1.png').default"
                />

                <div class="text-card">Atom Pro</div>

                <div class="features">
                  <div class="features__item">
                    <div class="item__name">Portable charging case</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-charging-case.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Smallest size avaliable</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-smallest-size.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Patented Comfort+ design</div>
                    <div class="item__icon">
                      <img
                        :src="require('@/assets/media/feat-comfort-plus-design.png')"
                      />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Enhanced feedback cancelation</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-feedback-cancel.png')" />
                    </div>
                  </div>
                  <div class="features__item">
                    <div class="item__name">Atom sound technology</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-atom-sound.png')" />
                    </div>
                  </div>
                  <div class="features__item features__item-last">
                    <div class="item__name">24hr rechargeable battery</div>
                    <div class="item__icon">
                      <img :src="require('@/assets/media/feat-24h-battery.png')" />
                    </div>
                  </div>

                  <v-btn
                    class="buy-now-btn mt-2"
                    @click="$router.push('/finish')"
                    color="#ffb404"
                  >
                    <img :src="require('@/assets/media/cart.png')" />
                    <span class="ml-2">Buy now</span>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import footerVue from "../../components/audien/footer.vue";
import headerVue from "../../components/audien/header.vue";
export default {
  components: {
    footerVue,
    headerVue,
  },
};
</script>
<style scoped>
.finish-right-side {
  background: #102132;
  /* padding-top: 100px; */
}
.button-dev {
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #1f2f40;
  border-radius: 10px;
  padding-top: 28px;
  padding-bottom: 23px;
}

.button-placeholder {
  padding-top: 5px;
  text-align: center;
  width: auto;
  width: 70;
}

.text-card {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 20px;
  padding-left: 4%;
  padding-top: 6%;
  padding-right: 4%;
  padding-bottom: 28px;
  color: #ffffff;
}
.features {
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
}
.features__item {
  border-top: 1px solid rgb(255 255 255 / 20%);
  padding-top: 10px;
  text-align: center;
}
.features__item-last {
  border-bottom: 1px solid rgb(255 255 255 / 20%);
  margin-bottom: 20px;
}
.item__name {
  color: #fff;
  font-family: "Lato";
  font-size: 11px;
  margin-bottom: 7px;
}
.item__icon {
  margin-bottom: 7px;
}

.footer {
  height: 100px;
  background: #07121c;
  display: flex;
  justify-content: space-around;
}
.flex-align {
  display: flex;
  flex-direction: row;
}

.ex1 span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* padding: 24px 4px 3px 11px; */
  border: 2px solid #142435;
  background: #1f2f40;
  border-radius: 5px;
  width: 11vw;
  height: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  padding-bottom: 7px;
  border-radius: 10px;
  -webkit-transition: all 0.25s linear;
  transition: all 0.25s linear;
  text-align: center;
}
.button-label {
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  /* or 130% */

  text-align: center;

  /* #FFFFFF */

  color: #ffffff;
}
.buy-now-btn {
  width: 100%;
}
.finish-right-side img {
  width: inherit;
}

.product-item {
  background: #1f2f40;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  width: 90vw;
}
.product-item .text-card {
  font-size: 1rem;
}
.mobile-products-container {
  display: none;
}
@media only screen and (max-width: 800px) {
  .product-descriptions {
    display: none;
  }

  .mobile-products-container {
    display: block;
    padding-bottom: 150px;
  }


}
</style>
