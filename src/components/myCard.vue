<template>

  <div
    class="mdc-card my-card"
    :class="{'my-card-ex':isExpanded}"
  >
    <div
      class="mdc-card__primary-action"
      @click="openCard(_id)"
    >
      <ui-skeleton
        v-if="isLoading"
        :paragraph="{rows:6}"
      ></ui-skeleton>
      <template v-else>
        <h2 id="card_title">{{ cardData.title }}</h2>
        <div class="my-card-content">
          <img
            :src="cardData.cover_url"
            class="cover"
          >
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
      </template>
    </div>
    <ui-divider></ui-divider>
    <div class="mdc-card__actions">
      <div class="mdc-card__action-buttons">
        <button
          v-show="false"
          class="mdc-button mdc-card__action mdc-card__action--button"
          @click="isExpanded=!isExpanded"
        >
          <div class="mdc-button__ripple"></div>
          <span
            v-if="isExpanded"
            class="mdc-button__label"
          >Collapse</span>
          <span
            v-else
            class="mdc-button__label"
          >Expand</span>
        </button>
      </div>
      <div class="mdc-card__action-icons">
        <button
          class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
          @click="shareCardClick(cardData._id)"
        >
          share
        </button>
        <ui-icon-button
          v-model="isBookmarked"
          :toggle="{on:'bookmark',off:'bookmark_border'}"
        ></ui-icon-button>
        <ui-menu-anchor>
          <button
            class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
            @click="isMenuOpen=true"
          >
            more_vert
          </button>
          <ui-menu
            v-model="isMenuOpen"
            position="BOTTOM_START"
          >
            <ui-menuitem>
              <span class="mdc-list-item__graphic material-icons ">content_copy</span>
              <ui-menuitem-text>Duplicate</ui-menuitem-text>
            </ui-menuitem>

            <ui-menuitem @click="deleteCardClick(_id)">
              <span class="mdc-list-item__graphic material-icons ">delete</span>
              <span class="mdc-list-item__text">Delete</span>
            </ui-menuitem>
            <li
              role="separator"
              class="mdc-list-divider"
            ></li>
            <ui-menuitem>
              <span class="mdc-list-item__graphic material-icons ">alarm</span>
              <span class="mdc-list-item__text">Alarm</span>
            </ui-menuitem>
          </ui-menu>
        </ui-menu-anchor>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import { deleteCard, getCard, bookmarkCard } from "@/composables/endpoint";
import { shareCard, writeClipboard } from '@/composables/useDashboard'
import router from "@/router";

export default {
  name: "my-card",
  props: {
    _id: { type: String, require: true },
    bookmarked: Boolean
  },
  components: {},

  setup (props) {
    const cardData = ref({})
    const isExpanded = ref(false);
    const isBookmarked = ref(props.bookmarked);
    const isLoading = ref(true);
    const isMenuOpen = ref(false);
    const refreshCards = inject("refresh");
    const openSnackbar = inject("openSnackbar");
    const deleteCardClick = (cid) => {
      deleteCard(cid).then((output) => {
        if (output["ok"] == 1) {
          openSnackbar();
          refreshCards();
        }

      });
    };

    const shareCardClick = (cid) => {
      try {
        shareCard(cid)
      } catch (err) { console.log(err) }

      writeClipboard("https://callet.tk/cards/" + cid)
      openSnackbar('Export to clipboard successfully')
    }

    const openCard = (cid) => {
      router.push({ path: `/cards/${cid}` })
    }


    getCard(props._id).then((output) => { cardData.value = output; isLoading.value = false; })

    watch(isBookmarked, (isBookmarked) => {
      bookmarkCard(props._id, isBookmarked).then((output) => {
        if (output["ok"] == 1) {
          if (isBookmarked == true) openSnackbar("Bookmarked successfully")
          else { openSnackbar("Unbookmarked successfully") }
        }
        else { openSnackbar(output["detail"]) }
      })
    })

    return {
      isExpanded,
      deleteCardClick,
      shareCardClick,
      cardData,
      isBookmarked,
      isLoading,
      isMenuOpen,
      openCard
    };
  },
};
</script>
<style lang="scss">
@use 'balm-ui/components/core';
@use 'balm-ui/components/skeleton/skeleton';
.my-card {
  width: 360px;
  height: 300px;
  transition: height 0.4s ease-in;
}

.my-card-ex {
  height: 100%;
}

.mdc-card__primary-action {
  padding: 16px;
}

#card_title {
  margin-top: 0;
  margin-bottom: 19px;
}
.mdc-skeleton-title {
  height: 24px;
  margin-top: 0;
}

.cover {
  max-width: 120px;
  float: right;
  margin-left: 8px;
}

.block-container {
  margin-block: 2px;
}

.mdc-card__actions {
  height: 52px;
}

.mdc-card__primary-action {
  flex-grow: 1;
}
</style>

