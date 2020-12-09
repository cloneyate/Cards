<template>
  <div id="list">
    <div class="item" v-for="cardData in cardsListData" :key="cardData">
      <my-card v-bind:cardData="cardData"></my-card>
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

#list{
  display: flex;
  flex-flow:row wrap;
  justify-content:space-between;
}

.item{
  margin:16px;
}


</style>