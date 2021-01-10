<template>
  <div id="app">
    <!-- 展示搜索区域、底部切换区域 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  created() {
    /* 拿取本地存储的商品数据 */
    const counterNum = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterNum', counterNum);
  },
};
</script>
<style lang="less">
</style>
