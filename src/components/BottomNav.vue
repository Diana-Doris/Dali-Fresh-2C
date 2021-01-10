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
        :badge="num"
        class="shop-car"
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
  computed: {
    num() {
      const goods = Object.values(this.$store.state.counterNum);
      /* let num = 0;
      goods.forEach((ele) => {
        num += ele;
      }); */
      const num = goods.reduce((prev, next) => prev + next, 0);
      if (num > 99) {
        return '99+';
      }
      console.log(num);
      return num;
    },
  },
};
</script>
