<template>
  <div class="bottomNav">
    <van-tabbar
      v-model="active"
      route
      fixed
    >
      <!-- 首页 -->
      <van-tabbar-item
        icon="home-o"
        to="/"
      >首页</van-tabbar-item>

      <!-- 分类 -->
      <van-tabbar-item
        icon="apps-o"
        :to="{name: 'Classify'}"
      >分类
      </van-tabbar-item>

      <!-- 购物车 -->
      <van-tabbar-item
        icon="cart-o"
        :to="{name: 'Shopping'}"
      >购物车
      </van-tabbar-item>

      <!-- 我的 -->
      <van-tabbar-item
        icon="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        :to="{name: 'Mine'}"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
