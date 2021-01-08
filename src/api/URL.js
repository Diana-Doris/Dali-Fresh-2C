/* 请求数据 */
import axios from '../axios';

export default {
  sliderBar(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
};
