/* 请求数据 */
import axios from '../axios';

export default {
  sliderBar(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
  itemClassify(obj) {
    return axios.get('/getGoodsList', { params: obj });
  },
  likeSearch(val) {
    return axios.get('/likeSearch', { params: { likeValue: val } });
  },
  search(obj) {
    return axios.get('/search', { params: obj });
  },
};
