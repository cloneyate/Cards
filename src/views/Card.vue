<template>
  <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <router-link to="/dashboard">
          <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
            arrow_back
          </button>
        </router-link>
        <span class="mdc-top-app-bar__title">Detail</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
      </section>
    </div>
  </header>

  <main
    class="main-content"
    id="main-content"
    ref="mainContentRef"
  >
    <div
      class="mdc-top-app-bar--fixed-adjust"
      style="padding-left:16px;padding-right:16px;max-width:1200px;margin-left:auto;margin-right:auto"
    >
      <div
        class="cover-wrapper"
        v-if="cardData.cover_url"
      >
        <img
          :src="cardData.cover_url"
          style="max-height:300px"
        />
      </div>
      <h2 id="card_title">{{ cardData.title }}</h2>
      <div class="my-card-content">
        <div
          class="block-container"
          v-for="block in cardData.blocks"
          :key="block.id"
        >
          <component
            :is="block.name"
            :data="block.data"
            :read-only="true"
          ></component>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import myCard from '../components/myCard'
import { getCard } from "@/composables/endpoint";

export default {
  name: "card",
  components: { myCard },
  props: {
    cid: {
      type: String,
      require: true
    }
  },

  setup (props) {
    const cardData = ref({})
    getCard(props.cid).then((output) => {
      cardData.value = output
    })
    return {
      cardData
    }
  }
}
</script>
<style lang="scss">
.cover-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>