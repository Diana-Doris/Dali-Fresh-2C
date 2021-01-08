/* 滑动速度 */
/**
 * @description: 滑动效果
 * @param {number} 滚动条起始位置
 * @param {number} 滚动条结束位置
 * @param {obj} 父级元素
 */
function moveTo(start, end, parent, type) {
  const firstParent = parent;
  let dis = 0;
  const speed = end > 0 ? 3 : -3;

  const t = setInterval(() => {
    dis += speed;
    firstParent[type] = start + dis;

    if (Math.abs(dis) > Math.abs(end)) {
      clearInterval(t);
      firstParent[type] = start + end;
    }
  }, 2);
}

/* 获取距离 */
/**
 * @description: 计算出需要挪动的距离
 * @param {obj} event
 * @param {obj} parent element
 * @return {start,end}
 */
export default function getDis(event, parent, type) {
  const { offsetWidth: itemWidth, offsetHeight: itemHeight } = event;
  const itemLeft = event.getBoundingClientRect().left;
  const itemTop = event.getBoundingClientRect().top;
  const PTop = parent.getBoundingClientRect().top;
  const { offsetWidth: wrapperWidth, offsetHeight: wrapperHeight } = parent;
  if (type === 'horizontal') {
    const end = itemWidth / 2 + itemLeft - wrapperWidth / 2; /* 需要滚动的距离 */
    moveTo(parent.scrollLeft, end, parent, 'scrollLeft');
  } else {
    const end = itemHeight / 2 + itemTop - PTop - wrapperHeight / 2; /* 需要滚动的距离 */
    moveTo(parent.scrollLeft, end, parent, 'scrollTop');
  }
}
