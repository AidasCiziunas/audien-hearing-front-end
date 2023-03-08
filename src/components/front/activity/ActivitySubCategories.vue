<template>
  <div>
    <ul>
      <li v-for="(subcat, index) in subCategories" :key="index">
        <template v-if="index < limitBy">
          <i class="fas fa-tags"></i>
          <p>{{ subcat }}</p>
        </template>
      </li>
    </ul>
    <a
      v-if="subCategories.length > 3"
      role="button"
      @click="toggleList()"
      style="float: right;"
      >{{ this.limitBy > 3 ? 'Hide More' : 'Show More' }}</a
    >
  </div>
</template>

<script>
export default {
  name: 'ActivitySubCategories',
  props: ['subCategories'],
  data() {
    return {
      limitBy: 3
    };
  },
  methods: {
    toggleList() {
      if (this.limitBy <= 3) {
        this.limitBy = this.subCategories.length;
      } else if (this.limitBy > 3) {
        this.limitBy = 3;
      }
    }
  }
};
</script>
