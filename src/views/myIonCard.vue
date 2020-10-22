<template>
  <ion-card class="my-card">
    <ion-card-header>
      <ion-card-title>
        {{ title }}
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
        <ion-img :src="mediaUrl"/>
      {{ mainContent }}
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
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButtons,
  IonButton,
  IonRippleEffect,
} from "@ionic/vue";

export default {
  name: "my-card",
  props: {
    mediaUrl: String,
    title: String,
    mainContent: String,
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
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

.ripple-parent {
  position: relative;
  overflow: hidden;
}

.my-card {
  width: 180px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
    margin-bottom: 16px;
}

ion-buttons > ion-button {
  width: 32px;
  border-radius: 50%;
}
</style>
