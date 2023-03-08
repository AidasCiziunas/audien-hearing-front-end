<template>
  <div>
    <router-view style="display: block"></router-view>
  </div>
</template>
<script>
export default {
  name: 'Backend',
};
</script>

<style scoped>
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
</style>
