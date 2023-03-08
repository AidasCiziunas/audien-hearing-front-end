<template>
    <div>
        <div v-if="slides.length > 0" class="gallery-slider-box">
            <v-carousel hide-delimiters v-model="model">
                <v-carousel-item v-for="(item, i) in slides" :key="i">
                    <expandable-image class="image" :src="item.img" />
                </v-carousel-item>
            </v-carousel>

            <div style="width: auto; margin-top: 15px; display: flex;">
                <div v-for="(s, i) in slides" :key="i" @click="currentImage(i)">
                    <img
                        :src="s.img"
                        style="width: 300px; height: 70px; padding-right: 5px;"
                    />
                </div>
            </div>
        </div>
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
