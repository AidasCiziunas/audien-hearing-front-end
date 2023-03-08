<template>
    <div v-if="slides.length > 0" class="gallery-slider-box">
        <v-carousel hide-delimiters v-model="model">
            <v-carousel-item v-for="(item, i) in slides" :key="i" eager>
                <expandable-image class="image" :src="item.img" />
            </v-carousel-item>
        </v-carousel>

        <template>
            <v-sheet class="mx-auto" elevation="8" max-width="1000">
                <v-slide-group v-model="model" class="pa-4" show-arrows>
                    <v-slide-item
                        v-for="(slide, i) in slides"
                        :key="i"
                        v-slot="{ toggle }"
                    >
                        <v-card
                            class="ma-4"
                            height="80"
                            width="100"
                            @click="toggle"
                        >
                            <img
                                :src="slide.img"
                                style="height: 100%; width: 100%;"
                            />
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </template>

        <!--<div style="width: auto; margin-top: 15px; display: flex;">
                       
                            <div v-for="(s , i) in slides"  :key="i"  @click="currentImage(i)" >
                                <img :src="s.img" style="width: 200px; height: 70px; padding-right: 5px;" />
                             </div>
                        
                        </div>

                        </div>-->
    </div>
</template>
<script>
import ExpandableImage from './ExpandableImage';
export default {
    name: 'slider',
    props: ['slides'],
    components: { ExpandableImage },
    data() {
        return {
            model: 0
        };
    },
    methods: {
        currentImage(ItemIndex) {
            this.model = ItemIndex;
        }
    }
};
</script>
