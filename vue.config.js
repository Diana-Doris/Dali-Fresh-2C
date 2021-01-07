const px2rem = require('postcss-px2rem');

module.exports = {
  // css预设器配置项
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。
          // 假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。
          px2rem({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
};
