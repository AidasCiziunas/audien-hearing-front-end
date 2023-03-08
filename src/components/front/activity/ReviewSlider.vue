<template>
  <div v-if="slides.length > 0">
    <template>
      <v-sheet class="mx-auto" max-width="1000">
        <v-slide-group v-model="model" class="pa-4" show-arrows>
          <v-slide-item
            v-for="(slide, i) in slides"
            :key="i"
            v-slot="{ toggle }"
          >
            <v-card class="ma-4" height="80" width="100" @click="toggle">
              <img
                :src="slide.photoVersions[5].url"
                style="height: 100%; width: 100%;"
              />
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ReviewSlider',
  props: ['slides'],
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
