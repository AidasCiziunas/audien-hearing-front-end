<template>
  <div>
    <v-row class="my-3">
      <v-col cols="12"> </v-col>
      <v-btn-toggle
        active-class="success"
        mandatory
        borderless
        dense
        v-model="time"
        @change="checkTime()"
      >
        <v-btn
          v-for="(option, index) in options"
          :key="index"
          class="mr-3"
          :value="option.startTime"
          :class="{ 'text-white': time === option.startTime }"
          v-if="typeof option.startTime!='undefined'"
        >
          {{ option.startTime }}
        </v-btn>
      </v-btn-toggle>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'TimeToggleButton',
  props: {
    options: {
      type: Array
    }
  },
  data() {
    return {
      time: ''
    };
  },

  methods: {
    checkTime() {
      
      console.log('TimeToggleButton', this.time);
      this.$emit('activityStartTime', this.time);
    }
  }
};
</script>
