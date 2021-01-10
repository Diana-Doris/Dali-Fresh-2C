import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);

export default function ({
  start, end, width, height, src,
}) {
  const app = new Animate({
    el: document.createElement('div') /* 挂载到这个新的div上 */,
    data() {
      return {
        moveX: start.left,
        moveY: start.top,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height,
      };
    },
  });
  document.body.appendChild(app.$el);

  setTimeout(() => {
    app.moveX = end.endX;
    app.moveY = end.endY;
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
  }, 0);
  /* 销毁 */
  setTimeout(() => {
    app.exist = false;
  }, 1100);
}
