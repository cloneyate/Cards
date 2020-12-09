<template>
  <ul class="mdc-image-list mdc-image-list--masonry my-image-list">
  <li v-for="cardData in cardsListData" :key=cardData class="mdc-image-list__item">
    <div class="mdc-image-list__image">
      <my-card v-bind:cardData="cardData"></my-card>
      </div>
  </li>
</ul>
</template>

<script>
import myCard from '@/components/myCard.vue';


export default {
  name: "cards-list",
  components: {
    myCard
  },
  props: {
    cardsListData: Array,
  },
};
</script>

<style lang="scss" scoped>
@use "@material/image-list/mdc-image-list";

@use "@material/image-list";

.my-image-list {
  @include image-list.masonry-columns(3);
  max-width: 1200px;
}

@media (max-width: 1080px) {
  .my-image-list {
    @include image-list.masonry-columns(2);
  }
}


@media (max-width: 720px) {
  .my-image-list {
    @include image-list.masonry-columns(1);
  }
}

#list{
  display: flex;
  flex-flow:row wrap;
  justify-content:space-between;
}

.item{
  margin:16px;
}


</style>