<template>
  
    <div class="grid-item" v-for="cardData in cardsListData" :key="cardData">
      <my-card v-bind:cardData="cardData"></my-card>
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
  padding:8px;
}
</style>