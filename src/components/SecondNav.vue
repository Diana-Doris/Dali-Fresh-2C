<template>
  <div
    class="side-bar-wrapper"
    ref="secondnav"
  >
    <div
      v-for="(item, index) in list"
      :key="item"
      :class="{active: I == index}"
      @touchend="click(index, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >{{ index == 0 ? '全部' : item}}</div>
  </div>
</template>

<script>
import getDis from '../utils/slider_Func';

export default {
  data() {
    return {
      move: false,
      I: 0,
      value: '',
      nextSibling: null,
      list: [],
      over: false,
    };
  },
  methods: {
    click(index, e) {
      if (this.move) {
        return;
      }
      this.I = index;
      /* 移动 */
      getDis(e.target, this.$refs.secondnav, 'vertical');
    },
  },
  watch: {
    '$store.state.sideBarList': {
      handler(newVal) {
        this.list = newVal;
      },
      immediata: true,
    },
  },
};

</script>

<style lang='less' scoped>
.side-bar-wrapper {
  position: fixed;
  top: 135px;
  left: 0;
  width: 79px;
  bottom: 1.33333rem;
  background: #f8f8f8;
  overflow: auto;
  div {
    width: 100%;
    text-align: center;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
.side-bar-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
