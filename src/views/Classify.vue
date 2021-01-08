<template>
  <div class="classify">

    <div class="fixed">
      <!-- 搜索框 -->
      <van-button
        class="searchbtn"
        :to="{name: 'Search'}"
        type="info"
      >
        <div class="searchcontent">
          <van-icon name="search" />
          <span>一个苹果特价1元1斤</span>
        </div>
      </van-button>

      <!-- 一级导航 -->
      <first-nav />

      <!-- 二级导航 -->
      <second-nav />
    </div>

  </div>
</template>

<script>
import firstNav from '../components/FirstNav.vue';
import secondNav from '../components/SecondNav.vue';

export default {
  components: {
    firstNav,
    secondNav,
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style scoped lang="less">
.classify {
  width: 375px;
  .fixed {
    // position: fixed;
    .searchbtn {
      width: 355px;
      height: 33px;
      background-color: #eee;
      border-radius: 20px;
      line-height: 33px;
      color: #a1a1a1;
      font-size: 14px;
      margin: 11px;
      margin-bottom: 0;
      border: none;

      .searchcontent {
        > * {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
