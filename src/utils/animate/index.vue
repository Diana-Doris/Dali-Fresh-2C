<template>
  <div
    v-if="exist"
    class="item"
    :style="{
      width:`${width}px`,
      height:`${height}px`,
      opacity,
      transform:`translate(${moveX}, ${moveY}) scale(${sx}, ${sy})`
      }"
  >

  </div>
</template>

<style scoped>
.item {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  transition: all 1s;
}
img {
  width: 100%;
  border-radius: 50%;
}
</style>
