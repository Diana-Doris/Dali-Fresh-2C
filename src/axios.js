import axios from 'axios';

const appkey = 'Diana_1609547392383';
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods',
});
/* 拦截请求 */
instance.interceptors.request.use(
  (config) => ({
    ...config,
    params: {
      appkey,
      ...config.params,
    },
  }),
  (error) => Promise.reject(error),
);
/* 拦截响应 */
instance.interceptors.response.use(
  (response) => {
    if (response.data.status === 'fail') {
      return Promise.reject(response.data.msg);
    }
    // console.log(response);
    return response.data;
  },
  (error) => Promise.reject(error),
);

export default instance;
