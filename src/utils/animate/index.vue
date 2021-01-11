<template>
  <div
    v-if='exist'
    class='item'
    :style='{
      width:`${width}px`,
      height:`${height}px`,
      opacity,
      transform: `translate(${moveX}px,${moveY}px) scale(${sx},${sy})`}'
  >
    <img :src="src">
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.item {
  position: fixed;
  transition: all 0.7s;
  z-index: 100;
  top: 0;
  left: 0;
  transform-origin: 5% 0%;
}
.item > img {
  width: 100%;
  border-radius: 50%;
}
</style>
