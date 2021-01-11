<template>
  <div class="search-wrapper">
    <!-- 头部搜索 -->
    <div class="search-head">
      <van-icon
        name="arrow-left"
        class="arr-left"
      ></van-icon>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        autofocus
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action>
          <div>搜索</div>
        </template>
        <!-- <template
          #action
          v-else
        >
          <router-link
            tag="div"
            class="shop-car"
            id="shop-car"
          >
            <van-icon name="shopping-cart-o" />
          </router-link>
        </template> -->
      </van-search>
    </div>

    <!-- 搜索相似的值 -->
    <div
      class="like-search"
      v-if="show || searchList.length"
    >
      <van-list>
        <van-cell
          v-for="item in searchList"
          :key="item"
          :title="item"
          @click="onSearch(item)"
        >
          <template #title>
            <span
              class="custom-title"
              v-html="formatHtml(item)"
            ></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 搜索的商品列表 -->
    <div
      class="goods-card"
      v-if="show"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 商品列表区域 -->
        <!-- <good-list></good-list> -->
      </van-list>
    </div>
    <!-- <div class="history">
      <History
        :searchList="searchList"
        @search="onSearch"
      ></History>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Url from '../api/URL';

export default {
  data() {
    return {
      value: '',
      place: '芒果10元3斤',
      timer: null,
      historyList: [],
      loading: false,
      finished: false,
      page: 1,
      show: true,
    };
  },
  computed: {
    ...mapState({
      // historyList: (state) => (state.historyList),
      searchList: (state) => (state.searchList),
    }),
    configPrams() {
      return {
        type: this.value,
        page: this.page,
        size: this.$store.state.size,
      };
    },
  },
  methods: {
    ...mapMutations(['clearSearchList']),
    ...mapActions(['getSearchList']),
    onSearch(val) {
      console.log(`search${val}`);
      // this.historyList.push(val);
      // console.log(this.historyList);

      if (val === '') {
        this.value = this.place;
      } else {
        this.value = val;
      }
      this.clearSearchList();
      this.page = 1;
      this.finished = false;
      this.show = false;
      this.onLoad(val);
      // this.show = true;
    },
    input(val) {
      if (this.value === '') {
        this.clearSearchList();
        return;
      }
      /* 看输入的时候是否有timer，真：在输入的过程中;假：输入完成之后，才会执行赋值timer */
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(() => {
          this.getSearchList(val);
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus(e) {
      console.log(`focus${e}`);
    },
    /* 格式化 */
    formatHtml(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));/* 匹配的值为红色，原生自带的属性 */
    },
    async onLoad() {
      this.show = false;
      const result = await Url.search(this.configPrams);
      console.log(result);
      /* if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      } */
    },
  },

};
</script>

<style lang="less">
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
  }
  .like-search {
    top: 50px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
