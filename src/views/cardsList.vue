<template>
  <div class="masonry">
    <div class="grid-item" v-for="cardData in cardsListData" :key="cardData">
      <my-card v-bind="cardData"></my-card>
    </div>
  </div>
</template>

<script>
import myCard from "./myCard.vue";

export default {
  name: "cards-list",
  components: {
    myCard,
  },
  props: {
    cardsListData: Array,
  },
};
</script>

<style lang="scss" scoped>
.masonry {
  columns: 2;
  column-gap: 0px;
}
.grid-item {
  break-inside: avoid;
  padding-top:8px;
  padding-bottom: 8px;
}
</style>
