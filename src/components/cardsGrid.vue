<template>
  <div id="list">
    <div
      class="list-complete-item"
      v-for="cardData in cardsList"
      :key="cardData"
    >
      <my-card v-bind="cardData"></my-card>
    </div>
  </div>

</template>

<script>
import myCard from "./myCard.vue";

export default {
  name: "cards-grid",
  components: {
    myCard
  },
  props: {
    cardsList: Array,
  },
};
</script>

<style lang="scss">
#list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.list-complete-item {
  margin: 16px;
}
</style>