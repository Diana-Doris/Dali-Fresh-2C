import Vue from 'vue';
import Vuex from 'vuex';
import Urls from '../api/URL';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
  },
  mutations: {
    setSideBarList(state, list) {
      state.sideBarList = list;
    },
  },
  actions: {
    /* 获得sidebarlist数据 */
    async getSlideList({ commit }, type) {
      // console.log(type);
      const list = await Urls.sliderBar(type);
      // console.log(list);
      commit('setSideBarList', list);
    },
  },
  modules: {},
});
