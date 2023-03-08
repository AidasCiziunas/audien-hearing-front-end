<template>
 <div>
    <div class="gallery-header">
         <h4>{{ villaData.displayName }}</h4>
        <div v-if="villaData" class="gallery-header-rating-box">  
                  <span class="hotedetailStar-rating"> 
                        <star-rating
                            :star-size="15"
                            :border-width="1"
                            border-color="#fff"
                            :rounded-corners="true"
                            :star-points="[
                                23,
                                2,
                                14,
                                17,
                                0,
                                19,
                                10,
                                34,
                                7,
                                50,
                                23,
                                43,
                                38,
                                50,
                                36,
                                34,
                                46,
                                19,
                                31,
                                17
                            ]"
                            :rating="Number(Math.round(villaData.starRating))"
                            :show-rating="false"
                            :read-only="true"
                        >
                        </star-rating>
 
                    </span>
                 </div>
                  </div>
                  <div class="gallery-contact-no"> 
                <p v-if="villaData.review_nr">
                    <span>(</span
                    ><span class="primary--text"
                        >{{ villaData.review_nr }} reviews</span
                    ><span>)</span>
                </p>
                <h6 v-if="villaData.review_score_word">
                    {{ villaData.review_score_word }}
                </h6> 
                <p>{{ villaData.address }}</p>
                <small v-if="villaData.review_score">
                    {{ villaData.review_score * 10 }}% of guests
                    recommend</small
                >
        </div>
      
     
    </div> 
    
</template>
<script>
import StarRating from 'vue-star-rating';

export default {
    name: 'villasDetailHeader',
    props: ['villaData'],
    components: { StarRating },
    data() {
        return {
            mapURL: ''
        };
    },
    methods: {
        stars(number) {
            if (number) {
                return Number(number);
            } else return 0;
        }
    }
};
</script>
