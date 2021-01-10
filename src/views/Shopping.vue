<template>
  <div class="shopping">
    {{ addGoodsList }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    console.log(this.addGoodsList);
  },
  computed: {
    ...mapState({
      itemList: (state) => (state.itemList),
      counterNum: (state) => (state.counterNum),
    }),
    addGoodsList() {
      const list = [];
      this.itemList.forEach((ele) => Object.keys(this.counterNum).forEach((id) => {
        if (ele.id === Number(id)) {
          list.push(ele);
        }
      }));
      return list;
    },
  },
};
</script>
