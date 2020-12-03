<template>
  <div class="mdc-card my-card">
    <router-link
      to="create"
      tag="div"
      class="mdc-card__primary-action"
    ></router-link>
    <div class="mdc-card__primary-action">
      <div class="my-card-left">
        <div class="my-card-content">
          <!-- ... additional primary action content ... -->
          <h2>{{ cardData.title }}</h2>
          <p>{{ cardData._id }}</p>
        </div>
      </div>
      <div class="my-card-right">
        <img :src="cardData.cover_url" style="margin-top: 24px" />
        <!--<div
        class="mdc-card__media mdc-card__media--square"
        :style="'background-image: url(' + cardData.cover_url + ')'"
      >
        <div class="mdc-card__media-content"></div>
      </div>-->
      </div>
    </div>
    <div class="mdc-card__actions">
      <div class="mdc-card__action-icons">
        <button
          class="mdc-icon-button mdc-card__action mdc-card__action--button"
        >
          <span class="material-icons icon-image-preview">share</span>
        </button>
        <button
          id="add-to-favorites"
          class="mdc-icon-button mdc-card__action mdc-card__action--button"
        >
          <span class="material-icons icon-image-preview">{{ icon_name }}</span>
        </button>
        <div class="mdc-menu-surface--anchor">
          <button
            class="mdc-icon-button mdc-card__action mdc-card__action--button"
            @click="openMenu()"
          >
            <span class="material-icons icon-image-preview">more_vert</span>
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
                    class="mdc-list-item__graphic material-icons icon-image-preview"
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
                  class="mdc-list-item__graphic material-icons icon-image-preview"
                  >delete</span
                >
                <span class="mdc-list-item__text">Delete</span>
              </li>
              <li role="separator" class="mdc-list-divider"></li>
              <li class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__ripple"></span>
                <span
                  class="mdc-list-item__graphic material-icons icon-image-preview"
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
import { ref, onMounted, inject } from "vue";
import {deleteCard} from "@/composables/card";

export default {
  name: "my-card",
  props: {
    cardData: Object,
  },
  components: {},
  setup() {
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
    
    const refreshCards=inject('refresh')
    const openSnackbar=inject('openSnackbar')
    const deleteCardClick = (cid) => {
      deleteCard(cid);
      openSnackbar();
      refreshCards();
    };

    onMounted(() => {
      menu = new MDCMenu(menuRef.value);
    });
    
    

    return {
      menuRef,
      menu,
      icon_name,
      openMenu,
      deleteCardClick
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

.my-card {
  max-width: 360px;
  max-height: 240px;
  margin-left: auto;
  margin-right: auto;
}

.my-card-content {
  padding: 16px;
}

.my-card-left {
  width: 67%;
}

.my-card-right {
  width: 33%;
  padding: 8px;
}

.mdc-card__primary-action {
  flex-direction: row;
}

.mdc-card__media {
  width: 33%;
}
</style>

