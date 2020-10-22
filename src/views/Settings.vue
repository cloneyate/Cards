<template>
<ion-page>
  <ion-header>
  <ion-toolbar>
  <ion-menu-button auto-hide="false" content-id="main">
  </ion-menu-button>
  </ion-toolbar>
  </ion-header>
  <ion-content><cards-list/></ion-content>
  

  <ion-menu side="start" menu-id="first" content-id="main" class="my-custom-menu">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>

        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>

      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-menu side="start" menu-id="custom" class="my-custom-menu" content-id="main">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Custom Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-menu side="end" type="push" content-id="main">
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>End Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-router-outlet id="main"></ion-router-outlet>
  </ion-page>
</template>
<style>
.my-custom-menu {
  --width: 300px;
}
</style>

<script>
import { 
  IonMenuButton,
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonMenu, 
  IonRouterOutlet,
  IonTitle, 
  IonToolbar
} from '@ionic/vue';
import cardsList from "./cardsList.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonMenuButton,
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
    IonTitle, 
    IonToolbar,
    cardsList
  },
  methods: {
  }
});
</script>
