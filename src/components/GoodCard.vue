<template >
  <div v-if="goodList">
    <div
      class="card van-hairline--bottom"
      v-for="(good, index) in goodList"
      :key="Math.random()*good.id"
    >
      <!-- 图片 -->
      <div class="card-img">
        <img
          :src="good.images[0]"
          ref="img"
        >
      </div>
      <!-- 内容 -->
      <div class="card-content">
        <!-- 标题、描述、标签、价钱 -->
        <div class="overflow-hidden title">{{ good.title }}</div>
        <div class="overflow-hidden desc">{{ good.desc }}</div>
        <div class="overflow-hidden tags">
          <div
            v-for="tag in good.tags"
            :key="tag"
          >{{ tag }}</div>
        </div>
        <div class="overflow-hidden prices">
          <div class="price-off">￥{{ good.price }}</div>
          <!-- <div class="price-off">￥{{ good.price_off }}</div> -->
          <!-- <div class="price">￥{{ good.price }}</div> -->
        </div>

        <!-- 数量 -->
        <div class="counter">
          <div
            @touchend="counter(good.id, -1,index)"
            v-show="counterNum[good.id]"
          >
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
          </div>
          <div
            class="num"
            v-show="counterNum[good.id]"
          >{{ counterNum[good.id] ? counterNum[good.id] : '' }}</div>
          <div @touchend="counter(good.id, 1,index)">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
          </div>
        </div>
        <!-- <div class="smaller">找相似</div> -->
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Animate from '../utils/animate';

export default {
  data() {
    return {
      showMoveDot: [],
      clickNum: 0,
      ID: null,
      elLeft: 0,
      elTop: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num, index) {
      // 修改本地的值
      this.storageChange({ id, num });
      /* 设置飞入购物车动画 */
      /*    起点位置 */
      const { left, top } = this.$refs.img[index].getBoundingClientRect();/* 图片起始位置 */
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img[0];/* 购物车款宽高 */

      const shopCar = document.querySelector('.shop-car');
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();/* 购物车的位置 */
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;/* 购物车款宽高 */

      /*    终点位置 */
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;

      if (num === 1) {
        Animate({
          src: this.$refs.img[index].src,
          start: {
            left,
            top,
          },
          end: {
            endX,
            endY,
          },
          width: imgWidth,
          height: imgHeight,
        });
      }
    },
  },
  computed: {
    ...mapState({
      goodList: (state) => state.itemList,
      counterNum: (state) => state.counterNum,
    }),
  },
  /*  watch: {
     '$store.state.itemList': {
       handler (newVal) {
         console.log(newVal);
         this.goodList = newVal;
       },
       immediate: true,
     },
   }, */
};
</script>

<style lang="less" scoped>
/* 这个组件是要复用的 */
.card {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    position: relative;
    flex: 1; /* 占得是剩下所有面积的所有值 */
    > div:not(.smaller) {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        border: 1px solid #aaa;
        padding: 1px 2px 2px 2px;
        color: #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      .price-off {
        font-size: 14px;
        color: #ff1a90;
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
    bottom: 12px;
    right: 15px;
    justify-content: flex-end;
    align-items: center;
    > div:not(.num) {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
  .smaller {
    text-align: right;
    justify-content: flex-end;
    position: absolute;
    bottom: 9px;
    right: 15px;
    border: 1px solid #ff1a90;
    border-radius: 4px;
    padding: 2px;
    width: 38px;
    color: #ff1a90;
    font-size: 12px;
  }
  .move-dot {
    position: relative;
    z-index: 500;
    height: 90px;
    width: 90px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
