import Vue from 'vue';
import Vuex from 'vuex';
import Urls from '../api/URL';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    showContent: false,
    size: 5,
    itemList: [],
    type: null,
    counterNum: {},
  },
  mutations: {
    setSideBarList(state, list) {
      state.sideBarList = list;
    },
    changeShowContent(state, val) {
      state.showContent = val;
    },
    changeItemList(state, list) {
      state.itemList = [...state.itemList, ...list];
      // console.log(state.itemList);
    },
    resetItemList(state) {
      state.itemList = [];
    },
    getTypeData(state, type) {
      state.type = type;
    },
    setCounterNum(state, map) {
      state.counterNum = map;
    },
    storageChange(state, { id, num }) {
      /* 看这个对应的id是否有值， */
      if (state.counterNum[id]) {
        if (num === -1 && state.counterNum[id] === 1) {
          /* 点击的减号 */
          Vue.delete(state.counterNum, id);
        } else {
          /* 点击的是加号 */
          Vue.set(state.counterNum, id, state.counterNum[id] + num);
        }
      } else {
        /* 没有值就设置添加1 */
        Vue.set(state.counterNum, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterNum));
    },
  },
  actions: {
    /* 获得sidebarlist数据 */
    async getSlideList({ commit }, type) {
      commit('changeShowContent', false);
      const list = await Urls.sliderBar(type);
      commit('setSideBarList', list);
      commit('changeShowContent', true);
    },
    /* 获取右侧数据 */
    async getItemList({ state, commit }, obj) {
      const { type } = obj;
      // console.log(obj);
      commit('getTypeData', type);
      const { list, total } = await Urls.itemClassify(obj);
      // console.log(state.itemList.length, total);
      commit('changeItemList', list);
      if (total > state.itemList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {},
});
