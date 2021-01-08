<template>
  <div
    class="list-wrapper"
    ref="wrapper"
  >
    <!-- 头部 -->
    <div class="list-header van-hairline--top-bottom">
      <div
        :class="{'active': type == 'all'}"
        @touchend="changeType('all')"
      >综合</div>
      <div
        :class="{'active': type == 'sale'}"
        @touchend="changeType('sale')"
      >销量</div>
      <div
        class="price"
        :class="{'price-up': type == 'price-up','price-down' : type == 'price-down'}"
        @touchend="changeType('price')"
      >价格</div>
    </div>
    <div
      class="list-content"
      ref="list"
    >
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        :immediate-check="false"
      >
        <!-- immediate-check=“false” 防止多刷新一次 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 商品列表区域 -->
          <good-list></good-list>

        </van-list>
      </van-pull-refresh>
    </div>
    <!-- <van-loading class="center" size="1rem" v-else  vertical color="pink"></van-loading> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import goodList from './GoodCard.vue';

export default {
  components: {
    goodList,
  },
  data() {
    return {
      type: 'all',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
    };
  },
  methods: {
    ...mapMutations(['resetItemList']),
    ...mapActions(['getItemList']),
    changeType(type) {
      if (type === 'all' || type === 'sale') {
        this.type = type;
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
    },
    /* 加载 */
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.getItemList({
        type: this.$store.state.type,
        page: this.page,
        size: this.$store.state.size,
        sort: 'all',
      });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    /* 刷新 */
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.resetItemList();/* 数据初始化 */
      this.refreshing = true;/* 刷新符号开启 */

      this.getItemList({
        type: this.$store.state.type,
        page: 1,
        size: this.$store.state.size,
        sort: 'all',
      });
      this.refreshing = false;/* 刷新符号结束 */

      this.onLoad();
    },
  },

};
</script>

<style lang="less" scoped>
.list-wrapper {
  transform: translateY(0);
  transition: all 0.3s;
  position: fixed;
  border-top: 1px solid #eee;
  top: 135px;
  right: 0;
  width: 296px;
  bottom: 50px;
  overflow: auto;
  .list-header {
    position: sticky;
    top: 0;
    height: 25px;
    width: 280px;
    padding: 0 8px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    z-index: 100;
    background: #fff;
    > div {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      color: #aaa;
      position: relative;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content {
    position: relative;
    transition: translateY 0.3s linear;
    .list-item {
      background: red;
      border-bottom: 1px solid white;
    }
  }
}
.list::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.card {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    > div {
      width: 190px;
      font-size: 12px;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 400;
    }
    .desc {
      color: #aaa;
      margin-bottom: 3px;
    }
    .tags {
      display: flex;
      margin-bottom: 3px;
      > div {
        border: 1px solid #aaa;
        padding: 1px;
        color: #aaa;
        border-radius: 3px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      .price-off {
        font-size: 14px;
        color: pink;
        font-weight: 600;
        margin-right: 5px;
      }
      .price {
        font-size: 12px;
        color: #aaa;
        text-decoration: line-through;
      }
    }
  }
  .counter {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 15px;
    justify-content: flex-end;
    > div:not(.num) {
      font-size: 22px;
      width: 22px;
      height: 22px;
      line-height: 19px;
      border-radius: 11px;
      color: white;
      font-weight: 700;
      background: lime;
      text-align: center;
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
}
.van-pull-refresh {
  overflow: unset;
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
