<template>
  <div class="home">

    <!-- 底部导航 -->
    <bottom-nav></bottom-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import bottomNav from '../components/BottomNav.vue';

export default {
  components: {
    bottomNav,
  },

};
</script>
