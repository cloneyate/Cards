<template>
  <div class="mdc-card my-card" :class="{'my-card-ex':isExpanded}">
    <div class="mdc-card__primary-action">
      <h1 id="card_title">{{ cardData.title }}</h1>
      <div class="my-card-content">
      <div class="my-card-left">
          <!-- ... additional primary action content ... -->
          <template v-for="(block,index) in cardData.blocks" :key="index">
          <p v-html="block['data']['text']" v-if="block['type']==='paragraph'"></p>
          <img v-else-if="block['type']==='image'" :src="block['data']['file']['url']">
          <my-header :level="block['data']['level']" v-else-if="block['type']==='header'">{{block['data']['text']}}</my-header>
          </template>
      </div>
      <div v-if="cardData.cover_url" class="my-card-right">
        <img :src="cardData.cover_url" />
      </div>
      </div>
    </div>
    <hr class="divider">
    <div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button
          class="mdc-button mdc-card__action mdc-card__action--button"
          @click="isExpanded=!isExpanded"
        >
        <div class="mdc-button__ripple"></div>
          <span v-if="isExpanded" class="mdc-button__label">Collapse</span>
          <span v-else class="mdc-button__label">Expand</span>
        </button>
    </div>
      <div class="mdc-card__action-icons">
        <button
          class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        >
          share
        </button>
        <button
          id="add-to-favorites"
          class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        >
          {{ icon_name }}
        </button>
        <div class="mdc-menu-surface--anchor">
          <button
            class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
            @click="openMenu()"
          >
            more_vert
          </button>

          <div ref="menuRef" class="mdc-menu mdc-menu-surface">
            <ul
              class="mdc-list"
              role="menu"
              aria-hidden="true"
              aria-orientation="vertical"
              tabindex="-1"
            >
              <li role="menuitem">
                <router-link
                  :to="{ name: 'create', params: { cid: cardData._id } }"
                  class="mdc-list-item"
                >
                  <span class="mdc-list-item__ripple"></span>
                  <span
                    class="mdc-list-item__graphic material-icons "
                    >content_copy</span
                  >
                  <span class="mdc-list-item__text">Duplicate</span>
                </router-link>
              </li>

              <li
                class="mdc-list-item"
                role="menuitem"
                @click="deleteCardClick(cardData._id)"
              >
                <span class="mdc-list-item__ripple"></span>
                <span
                  class="mdc-list-item__graphic material-icons "
                  >delete</span
                >
                <span class="mdc-list-item__text">Delete</span>
              </li>
              <li role="separator" class="mdc-list-divider"></li>
              <li class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__ripple"></span>
                <span
                  class="mdc-list-item__graphic material-icons "
                  >alarm</span
                >
                <span class="mdc-list-item__text">Alarm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import cardMenu from "./cardMenu.vue";
import { MDCMenu } from "@material/menu";
import { ref, onMounted, inject,defineComponent,h } from "vue";
import { deleteCard } from "@/composables/endpoint";

const myHeader=defineComponent({
  name:"my-header",
  props:{
    level:{
      type: Number,
      required: true
    }
  },
  render: function () {
    return h(
      'h' + this.level,
      this.$slots.default()
    )
  }
})

export default {
  name: "my-card",
  props: {
    cardData: Object,
  },
  components: {myHeader},
  
  setup() {
    const isExpanded=ref(false);
    const icon_name = ref("bookmark_border");
    const menuRef = ref(null);
    let menu = null;
    const openMenu = () => {
      try {
        menu.open = true;
      } catch (error) {
        console.log(error);
      }
    };

    

    const refreshCards = inject("refresh");
    const openSnackbar = inject("openSnackbar");
    const deleteCardClick = (cid) => {
      deleteCard(cid).then((output) => {
        if (output["success"]==1){
          openSnackbar();
          refreshCards();
        }
        
      });
    };

    


    onMounted(() => {
      menu = new MDCMenu(menuRef.value);
    });

    
    return {
      isExpanded,
      menuRef,
      menu,
      icon_name,
      openMenu,
      deleteCardClick,
    };
  },
};
</script>
<style lang="scss" >
@use "@material/card";
@use "@material/icon-button";
@use "@material/ripple";
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
@use "@material/button";

@include button.core-styles;
@include card.core-styles;
@include icon-button.core-styles;

.my-card{
  width: 360px;
  max-height: 300px;
  transition: max-height 0.8s;
}

.my-card-ex{
  max-height: 100%;
}

.mdc-card__primary-action{
  padding:16px;
}

#card_title{
  margin:0;
}

.my-card-content{
  display: flex;
  flex-direction: row;
}

.my-card-left {
  flex: 2 1 0;
}

.my-card-right {
  flex: 1 1 0;
}

.my-card-right img {
  max-height: 100%;
  max-width: 100%;
}

.divider{
  margin:0;
  opacity: 30%;
}
</style>

