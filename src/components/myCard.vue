<template>
  <div class="mdc-card my-card">
    <div class="mdc-card__primary-action">
      <div class="mdc-card__media mdc-card__media--square">
        <div class="mdc-card__media-content">
          <img v-bind:src="cover_url" />
        </div>
      </div>
      <!-- ... additional primary action content ... -->

      <h3>{{ title }}</h3>
    </div>
    <div class="mdc-card__actions">
      <div class="mdc-card__action-icons">
        <ion-buttons>
          <ion-button class="ripple-parent">
            <span class="material-icons icon-image-preview">share</span>
            <ion-ripple-effect type="unbounded"></ion-ripple-effect>
          </ion-button>
          <ion-button class="ripple-parent">
            <span class="material-icons icon-image-preview">favorite</span>
            <ion-ripple-effect type="unbounded"></ion-ripple-effect>
          </ion-button>
          <ion-button class="ripple-parent">
            <span class="material-icons icon-image-preview">more_vert</span>
            <ion-ripple-effect type="unbounded"></ion-ripple-effect>
          </ion-button>
        </ion-buttons>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonRippleEffect } from "@ionic/vue";

export default {
  name: "my-card",
  props: {
    cover_url: String,
    title: String,
  },
  components: {
    IonButtons,
    IonButton,
    IonRippleEffect,
  },
};
</script>
<style lang="scss" scoped>
@use "@material/card";
@use "@material/icon-button";
@use "@material/ripple";

@include card.core-styles;
@include icon-button.core-styles;

.my-card {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

.ripple-parent {
  position: relative;
  overflow: hidden;
}

ion-buttons > ion-button {
  width: 32px;
  border-radius: 50%;
}
</style>

